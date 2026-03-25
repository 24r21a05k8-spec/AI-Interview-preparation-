# Database Setup Instructions

## Supabase Project Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: ai-interview-prep
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 2. Configure Environment Variables

1. Copy `backend/.env.example` to `backend/.env`
2. Fill in the Supabase configuration:
   - **SUPABASE_URL**: Found in Project Settings > API > Project URL
   - **SUPABASE_ANON_KEY**: Found in Project Settings > API > Project API keys > anon public
   - **SUPABASE_SERVICE_ROLE_KEY**: Found in Project Settings > API > Project API keys > service_role (keep this secret!)

### 3. Run Database Migrations

#### Option A: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the contents of `backend/database/migrations/001_initial_schema.sql`
5. Click "Run" to execute the migration
6. Create another new query
7. Copy and paste the contents of `backend/database/seeds/002_seed_roles_and_skills.sql`
8. Click "Run" to execute the seed data
9. Create a third new query
10. Copy and paste the contents of `backend/database/migrations/003_row_level_security.sql`
11. Click "Run" to execute the RLS policies

#### Option B: Using Supabase CLI (Advanced)

1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref YOUR_PROJECT_REF`
4. Run migrations: `supabase db push`

### 4. Verify Database Setup

After running the migrations, you should see the following tables in your Supabase dashboard under "Table Editor":

- `roles` - Job roles (Software Engineer, Data Scientist, etc.)
- `skills` - Technical skills (JavaScript, Python, etc.)
- `role_skills` - Many-to-many relationship between roles and skills
- `user_profiles` - Extended user profile information
- `user_roles` - User's selected roles
- `user_skills` - User's selected skills
- `interview_sessions` - Interview session metadata
- `questions` - Generated interview questions
- `session_questions` - Questions associated with specific sessions

### Row Level Security (RLS) Status

After running the RLS migration, the following tables should have RLS enabled:
- `user_profiles` - Users can only access their own profile
- `user_roles` - Users can only manage their own role selections
- `user_skills` - Users can only manage their own skill selections
- `interview_sessions` - Users can only access their own sessions
- `questions` - Users can only access questions from their own sessions
- `session_questions` - Users can only access questions from their own sessions

Public tables (no RLS needed):
- `roles` - All authenticated users can read
- `skills` - All authenticated users can read
- `role_skills` - All authenticated users can read

### 5. Test Database Connection

You can test the database connection by running a simple query in the SQL Editor:

```sql
SELECT COUNT(*) as role_count FROM roles;
SELECT COUNT(*) as skill_count FROM skills;
SELECT COUNT(*) as role_skill_associations FROM role_skills;

-- Test RLS policies (should only return data for authenticated user)
SELECT * FROM user_profiles; -- Should be empty or only show your profile
SELECT * FROM interview_sessions; -- Should be empty initially
```

This should return:
- 10 roles
- 50+ skills
- Multiple role-skill associations

## Database Schema Overview

### Core Tables

- **roles**: Available job positions
- **skills**: Technical competencies
- **role_skills**: Which skills are relevant for each role
- **user_profiles**: Extended user information (linked to Supabase auth.users)
- **user_roles**: User's selected target roles
- **user_skills**: User's selected skills to focus on

### Interview Tables

- **interview_sessions**: Metadata for each interview practice session
- **questions**: AI-generated interview questions
- **session_questions**: Links questions to specific sessions with ordering

### Key Features

- **UUID Primary Keys**: All tables use UUIDs for better scalability
- **Foreign Key Constraints**: Proper referential integrity
- **Check Constraints**: Data validation at database level
- **Indexes**: Optimized for common query patterns
- **Triggers**: Automatic timestamp updates
- **Array Columns**: Flexible storage for skills and hints

## Next Steps

After completing the database setup:

1. Configure Row Level Security (RLS) policies (Task 2.2)
2. Test the backend API connection to Supabase
3. Implement authentication endpoints
4. Begin frontend integration

## Troubleshooting

### Common Issues

1. **Connection Error**: Verify SUPABASE_URL and keys in .env file
2. **Permission Error**: Ensure you're using the service_role key for admin operations
3. **Migration Error**: Check SQL syntax and run queries one at a time
4. **Seed Data Error**: Ensure the schema migration ran successfully first

### Useful SQL Queries

```sql
-- Check table structure
\d+ roles;
\d+ skills;
\d+ user_profiles;

-- Verify seed data
SELECT r.name, COUNT(rs.skill_id) as skill_count 
FROM roles r 
LEFT JOIN role_skills rs ON r.id = rs.role_id 
GROUP BY r.name 
ORDER BY skill_count DESC;

-- Check indexes
SELECT schemaname, tablename, indexname, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
```