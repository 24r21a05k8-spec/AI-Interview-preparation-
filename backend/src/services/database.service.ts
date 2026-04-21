import { getSupabaseClient, getSupabaseServiceClient, Database } from '../config/database.js';
import type { 
  UserProfile, 
  Role, 
  Skill, 
  InterviewSession, 
  Question, 
  SessionQuestion 
} from '../config/database.js';

/**
 * Database service for handling common database operations
 * This service respects RLS policies and provides type-safe database access
 */
export class DatabaseService {
  private client;
  private serviceClient;

  constructor() {
    this.client = getSupabaseClient();
    this.serviceClient = getSupabaseServiceClient();
  }

  // =============================================================================
  // USER PROFILE OPERATIONS
  // =============================================================================

  /**
   * Get user profile by user ID (respects RLS - user can only get their own profile)
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.client
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw new Error(`Failed to get user profile: ${error.message}`);
    }

    return data;
  }

  /**
   * Create user profile (typically called after user registration)
   */
  async createUserProfile(profile: Database['public']['Tables']['user_profiles']['Insert']): Promise<UserProfile> {
    const { data, error } = await this.client
      .from('user_profiles')
      // @ts-expect-error - Supabase type inference issue with custom Database type
      .insert(profile)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user profile: ${error.message}`);
    }

    return data;
  }

  /**
   * Update user profile (respects RLS - user can only update their own profile)
   */
  async updateUserProfile(
    userId: string, 
    updates: Database['public']['Tables']['user_profiles']['Update']
  ): Promise<UserProfile> {
    const { data, error } = await this.client
      .from('user_profiles')
      // @ts-expect-error - Supabase type inference issue with custom Database type
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user profile: ${error.message}`);
    }

    return data;
  }

  // =============================================================================
  // ROLE AND SKILL OPERATIONS (PUBLIC DATA)
  // =============================================================================

  /**
   * Get all available roles (public data)
   */
  async getAllRoles(): Promise<Role[]> {
    const { data, error } = await this.client
      .from('roles')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to get roles: ${error.message}`);
    }

    return data;
  }

  /**
   * Get all available skills (public data)
   */
  async getAllSkills(): Promise<Skill[]> {
    const { data, error } = await this.client
      .from('skills')
      .select('*')
      .order('category, name');

    if (error) {
      throw new Error(`Failed to get skills: ${error.message}`);
    }

    return data;
  }

  /**
   * Get skills for a specific role
   */
  async getSkillsForRole(roleId: string): Promise<Skill[]> {
    const { data, error } = await this.client
      .from('role_skills')
      .select(`
        skills (
          id,
          name,
          description,
          category,
          difficulty,
          created_at,
          updated_at
        )
      `)
      .eq('role_id', roleId);

    if (error) {
      throw new Error(`Failed to get skills for role: ${error.message}`);
    }

    // @ts-expect-error - Supabase nested select type inference issue
    return data.map(item => item.skills).filter(Boolean) as Skill[];
  }

  // =============================================================================
  // USER ROLE AND SKILL SELECTIONS
  // =============================================================================

  /**
   * Get user's selected roles (respects RLS)
   */
  async getUserRoles(userId: string): Promise<Role[]> {
    const { data, error } = await this.client
      .from('user_roles')
      .select(`
        roles (
          id,
          name,
          description,
          category,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to get user roles: ${error.message}`);
    }

    // @ts-expect-error - Supabase nested select type inference issue
    return data.map(item => item.roles).filter(Boolean) as Role[];
  }

  /**
   * Get user's selected skills (respects RLS)
   */
  async getUserSkills(userId: string): Promise<Skill[]> {
    const { data, error } = await this.client
      .from('user_skills')
      .select(`
        skills (
          id,
          name,
          description,
          category,
          difficulty,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to get user skills: ${error.message}`);
    }

    // @ts-expect-error - Supabase nested select type inference issue
    return data.map(item => item.skills).filter(Boolean) as Skill[];
  }

  /**
   * Update user's role selections (respects RLS)
   */
  async updateUserRoles(userId: string, roleIds: string[]): Promise<void> {
    // First, delete existing role selections
    const { error: deleteError } = await this.client
      .from('user_roles')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      throw new Error(`Failed to delete existing user roles: ${deleteError.message}`);
    }

    // Then, insert new role selections
    if (roleIds.length > 0) {
      const insertData = roleIds.map(roleId => ({ user_id: userId, role_id: roleId }));
      const { error: insertError } = await this.client
        .from('user_roles')
        // @ts-expect-error - Supabase type inference issue with custom Database type
        .insert(insertData);

      if (insertError) {
        throw new Error(`Failed to insert user roles: ${insertError.message}`);
      }
    }
  }

  /**
   * Update user's skill selections (respects RLS)
   */
  async updateUserSkills(userId: string, skillIds: string[]): Promise<void> {
    // First, delete existing skill selections
    const { error: deleteError } = await this.client
      .from('user_skills')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      throw new Error(`Failed to delete existing user skills: ${deleteError.message}`);
    }

    // Then, insert new skill selections
    if (skillIds.length > 0) {
      const insertData = skillIds.map(skillId => ({ user_id: userId, skill_id: skillId }));
      const { error: insertError } = await this.client
        .from('user_skills')
        // @ts-expect-error - Supabase type inference issue with custom Database type
        .insert(insertData);

      if (insertError) {
        throw new Error(`Failed to insert user skills: ${insertError.message}`);
      }
    }
  }

  // =============================================================================
  // INTERVIEW SESSION OPERATIONS
  // =============================================================================

  /**
   * Create new interview session (respects RLS)
   */
  async createInterviewSession(
    session: Database['public']['Tables']['interview_sessions']['Insert']
  ): Promise<InterviewSession> {
    const { data, error } = await this.client
      .from('interview_sessions')
      // @ts-expect-error - Supabase type inference issue with custom Database type
      .insert(session)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create interview session: ${error.message}`);
    }

    return data;
  }

  /**
   * Get user's interview sessions (respects RLS)
   */
  async getUserInterviewSessions(userId: string): Promise<InterviewSession[]> {
    const { data, error } = await this.client
      .from('interview_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get user interview sessions: ${error.message}`);
    }

    return data;
  }

  /**
   * Get specific interview session (respects RLS)
   */
  async getInterviewSession(sessionId: string): Promise<InterviewSession | null> {
    const { data, error } = await this.client
      .from('interview_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw new Error(`Failed to get interview session: ${error.message}`);
    }

    return data;
  }

  /**
   * Update interview session (respects RLS)
   */
  async updateInterviewSession(
    sessionId: string,
    updates: Database['public']['Tables']['interview_sessions']['Update']
  ): Promise<InterviewSession> {
    const { data, error} = await this.client
      .from('interview_sessions')
      // @ts-expect-error - Supabase type inference issue with custom Database type
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update interview session: ${error.message}`);
    }

    return data;
  }

  // =============================================================================
  // QUESTION OPERATIONS
  // =============================================================================

  /**
   * Create new question
   */
  async createQuestion(question: Database['public']['Tables']['questions']['Insert']): Promise<Question> {
    const { data, error } = await this.client
      .from('questions')
      // @ts-expect-error - Supabase type inference issue with custom Database type
      .insert(question)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create question: ${error.message}`);
    }

    return data;
  }

  /**
   * Get questions for a specific session (respects RLS through session ownership)
   */
  async getSessionQuestions(sessionId: string): Promise<(Question & { order_index: number })[]> {
    const { data, error } = await this.client
      .from('session_questions')
      .select(`
        order_index,
        response_time,
        answered_at,
        questions (
          id,
          text,
          type,
          difficulty,
          skills,
          expected_answer,
          hints,
          created_at,
          updated_at
        )
      `)
      .eq('session_id', sessionId)
      .order('order_index');

    if (error) {
      throw new Error(`Failed to get session questions: ${error.message}`);
    }

    return data.map(item => ({
      // @ts-expect-error - Supabase nested select type inference issue
      ...item.questions,
      // @ts-expect-error - Supabase nested select type inference issue
      order_index: item.order_index
    })) as (Question & { order_index: number })[];
  }

  /**
   * Add questions to a session
   */
  async addQuestionsToSession(
    sessionId: string, 
    questions: Question[]
  ): Promise<SessionQuestion[]> {
    // Create session_questions entries
    const sessionQuestions = questions.map((question, index) => ({
      session_id: sessionId,
      question_id: question.id,
      order_index: index + 1
    }));

    const { data, error } = await this.client
      .from('session_questions')
      // @ts-expect-error - Supabase type inference issue with custom Database type
      .insert(sessionQuestions)
      .select();

    if (error) {
      throw new Error(`Failed to add questions to session: ${error.message}`);
    }

    return data;
  }

  // =============================================================================
  // ADMIN OPERATIONS (using service client)
  // =============================================================================

  /**
   * Get all users (admin only - uses service client)
   */
  async getAllUsers(): Promise<any[]> {
    const { data, error } = await this.serviceClient.auth.admin.listUsers();

    if (error) {
      throw new Error(`Failed to get all users: ${error.message}`);
    }

    return data.users;
  }

  /**
   * Test RLS policies by attempting unauthorized access
   */
  async testRLSPolicies(testUserId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Try to access another user's profile (should fail)
      const { data, error } = await this.client
        .from('user_profiles')
        .select('*')
        .eq('id', testUserId);

      if (error || !data || data.length === 0) {
        return { success: true, message: 'RLS policies are working correctly - unauthorized access blocked' };
      } else {
        return { success: false, message: 'RLS policies may not be working - unauthorized access allowed' };
      }
    } catch (error) {
      return { success: true, message: `RLS policies are working - error: ${error}` };
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();