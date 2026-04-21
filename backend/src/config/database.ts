import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { config } from './config.js';

// Database types based on our schema
export interface DatabaseUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  default_question_count: number;
  preferred_difficulty: 'beginner' | 'intermediate' | 'advanced';
  mock_interview_duration: number;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

export interface InterviewSession {
  id: string;
  user_id: string;
  role: string;
  skills: string[];
  status: 'active' | 'completed' | 'paused';
  started_at: string;
  completed_at?: string;
  total_questions: number;
  time_spent: number;
  average_response_time: number;
  completion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'technical' | 'behavioral' | 'system-design';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  expected_answer?: string;
  hints?: string[];
  created_at: string;
  updated_at: string;
}

export interface SessionQuestion {
  id: string;
  session_id: string;
  question_id: string;
  order_index: number;
  response_time?: number;
  answered_at?: string;
  created_at: string;
}

// Database schema type for Supabase - must match exact structure Supabase expects
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'> & { id?: string }
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      roles: {
        Row: Role
        Insert: Omit<Role, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Role, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      skills: {
        Row: Skill
        Insert: Omit<Skill, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Skill, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      user_roles: {
        Row: { id: string; user_id: string; role_id: string; created_at: string }
        Insert: { user_id: string; role_id: string }
        Update: never
        Relationships: []
      }
      user_skills: {
        Row: { id: string; user_id: string; skill_id: string; created_at: string }
        Insert: { user_id: string; skill_id: string }
        Update: never
        Relationships: []
      }
      role_skills: {
        Row: { id: string; role_id: string; skill_id: string; created_at: string }
        Insert: { role_id: string; skill_id: string }
        Update: never
        Relationships: []
      }
      interview_sessions: {
        Row: InterviewSession
        Insert: Omit<InterviewSession, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<InterviewSession, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      questions: {
        Row: Question
        Insert: Omit<Question, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Question, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      session_questions: {
        Row: SessionQuestion
        Insert: Omit<SessionQuestion, 'id' | 'created_at'>
        Update: Partial<Omit<SessionQuestion, 'id' | 'created_at'>>
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Create Supabase client instances
let supabaseClient: SupabaseClient<Database> | null = null;
let supabaseServiceClient: SupabaseClient<Database> | null = null;

/**
 * Get the Supabase client for user operations (uses anon key)
 */
export function getSupabaseClient() {
  if (!supabaseClient) {
    if (!config.supabase.url || !config.supabase.anonKey) {
      throw new Error('Supabase URL and anon key must be configured');
    }
    
    supabaseClient = createClient<Database>(
      config.supabase.url,
      config.supabase.anonKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: false, // Server-side, don't persist sessions
        },
      }
    );
  }
  
  return supabaseClient;
}

/**
 * Get the Supabase service client for admin operations (uses service role key)
 */
export function getSupabaseServiceClient() {
  if (!supabaseServiceClient) {
    if (!config.supabase.url || !config.supabase.serviceRoleKey) {
      throw new Error('Supabase URL and service role key must be configured');
    }
    
    supabaseServiceClient = createClient<Database>(
      config.supabase.url,
      config.supabase.serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  
  return supabaseServiceClient;
}

/**
 * Test database connection
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client.from('roles').select('count').limit(1);
    
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection test error:', error);
    return false;
  }
}

/**
 * Initialize database connection and run basic checks
 */
export async function initializeDatabase(): Promise<void> {
  console.log('Initializing database connection...');
  
  const isConnected = await testDatabaseConnection();
  if (!isConnected) {
    throw new Error('Failed to connect to database');
  }
  
  console.log('Database initialized successfully');
}

// Export clients for direct use when needed
export { supabaseClient, supabaseServiceClient };