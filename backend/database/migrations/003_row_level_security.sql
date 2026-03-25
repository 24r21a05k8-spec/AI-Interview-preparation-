-- Row Level Security (RLS) Policies
-- This migration sets up security policies to ensure data isolation and proper access control

-- Enable RLS on all tables that need user data isolation
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_questions ENABLE ROW LEVEL SECURITY;

-- Keep roles, skills, and role_skills tables public (no RLS needed)
-- These are reference data that all authenticated users should be able to read

-- =============================================================================
-- USER PROFILES POLICIES
-- =============================================================================

-- Users can only view and edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Service role can manage all profiles (for admin operations)
CREATE POLICY "Service role can manage all profiles" ON user_profiles
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =============================================================================
-- USER ROLES POLICIES
-- =============================================================================

-- Users can only manage their own role selections
CREATE POLICY "Users can view own roles" ON user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roles" ON user_roles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own roles" ON user_roles
    FOR DELETE USING (auth.uid() = user_id);

-- Service role can manage all user roles
CREATE POLICY "Service role can manage all user roles" ON user_roles
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =============================================================================
-- USER SKILLS POLICIES
-- =============================================================================

-- Users can only manage their own skill selections
CREATE POLICY "Users can view own skills" ON user_skills
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills" ON user_skills
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills" ON user_skills
    FOR DELETE USING (auth.uid() = user_id);

-- Service role can manage all user skills
CREATE POLICY "Service role can manage all user skills" ON user_skills
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =============================================================================
-- INTERVIEW SESSIONS POLICIES
-- =============================================================================

-- Users can only access their own interview sessions
CREATE POLICY "Users can view own sessions" ON interview_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON interview_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON interview_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON interview_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Service role can manage all sessions
CREATE POLICY "Service role can manage all sessions" ON interview_sessions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =============================================================================
-- QUESTIONS POLICIES
-- =============================================================================

-- Questions are associated with users through sessions, but we'll allow
-- authenticated users to view questions they have access to through their sessions
-- For simplicity, we'll allow authenticated users to create questions
-- but only view questions from their own sessions

-- Authenticated users can create questions
CREATE POLICY "Authenticated users can create questions" ON questions
    FOR INSERT TO authenticated WITH CHECK (true);

-- Users can view questions from their own sessions
CREATE POLICY "Users can view questions from own sessions" ON questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM session_questions sq
            JOIN interview_sessions s ON sq.session_id = s.id
            WHERE sq.question_id = questions.id AND s.user_id = auth.uid()
        )
    );

-- Users can update questions from their own sessions (for feedback, etc.)
CREATE POLICY "Users can update questions from own sessions" ON questions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM session_questions sq
            JOIN interview_sessions s ON sq.session_id = s.id
            WHERE sq.question_id = questions.id AND s.user_id = auth.uid()
        )
    );

-- Service role can manage all questions
CREATE POLICY "Service role can manage all questions" ON questions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =============================================================================
-- SESSION QUESTIONS POLICIES
-- =============================================================================

-- Users can only access session questions for their own sessions
CREATE POLICY "Users can view own session questions" ON session_questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM interview_sessions s
            WHERE s.id = session_questions.session_id AND s.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create own session questions" ON session_questions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM interview_sessions s
            WHERE s.id = session_questions.session_id AND s.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own session questions" ON session_questions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM interview_sessions s
            WHERE s.id = session_questions.session_id AND s.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own session questions" ON session_questions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM interview_sessions s
            WHERE s.id = session_questions.session_id AND s.user_id = auth.uid()
        )
    );

-- Service role can manage all session questions
CREATE POLICY "Service role can manage all session questions" ON session_questions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =============================================================================
-- PUBLIC ACCESS POLICIES FOR REFERENCE DATA
-- =============================================================================

-- Allow authenticated users to read roles (no RLS needed, but adding for clarity)
-- These tables don't have RLS enabled, so they're accessible to all authenticated users

-- Create a function to check if user is authenticated (useful for other policies)
CREATE OR REPLACE FUNCTION auth.is_authenticated()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- UTILITY FUNCTIONS FOR RLS
-- =============================================================================

-- Function to check if a user owns a session
CREATE OR REPLACE FUNCTION auth.user_owns_session(session_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM interview_sessions
        WHERE id = session_id AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a user has access to a question through their sessions
CREATE OR REPLACE FUNCTION auth.user_has_question_access(question_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM session_questions sq
        JOIN interview_sessions s ON sq.session_id = s.id
        WHERE sq.question_id = question_id AND s.user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- ADDITIONAL SECURITY MEASURES
-- =============================================================================

-- Ensure user_profiles record is created when a user signs up
-- This trigger function will be called by Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, default_question_count, preferred_difficulty, mock_interview_duration)
    VALUES (
        NEW.id,
        5, -- default question count
        'intermediate', -- default difficulty
        30 -- default mock interview duration in minutes
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
-- Note: This trigger should be created on auth.users table, but since we can't modify
-- the auth schema directly, this will need to be set up through Supabase dashboard
-- or using a database webhook. For now, we'll handle this in the application code.

-- =============================================================================
-- TESTING QUERIES (for verification)
-- =============================================================================

-- These queries can be used to test the RLS policies
-- Run these as different users to verify isolation

/*
-- Test user data isolation (run as authenticated user)
SELECT * FROM user_profiles; -- Should only return current user's profile
SELECT * FROM interview_sessions; -- Should only return current user's sessions

-- Test public data access (run as authenticated user)
SELECT * FROM roles; -- Should return all roles
SELECT * FROM skills; -- Should return all skills
SELECT * FROM role_skills; -- Should return all role-skill associations

-- Test question access (run as authenticated user)
SELECT q.* FROM questions q
JOIN session_questions sq ON q.id = sq.question_id
JOIN interview_sessions s ON sq.session_id = s.id
WHERE s.user_id = auth.uid(); -- Should only return questions from user's sessions
*/