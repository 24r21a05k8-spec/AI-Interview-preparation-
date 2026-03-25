import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
  'JWT_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  // Server configuration
  server: {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },

  // Supabase configuration
  supabase: {
    url: process.env.SUPABASE_URL!,
    anonKey: process.env.SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },

  // OpenAI configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000', 10),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Rate limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // Application configuration
  app: {
    defaultQuestionCount: 5,
    maxQuestionCount: 20,
    defaultMockInterviewDuration: 30, // minutes
    maxMockInterviewDuration: 180, // minutes
  },
} as const;

// Type for configuration
export type Config = typeof config;

// Validate configuration on import
export function validateConfig(): void {
  // Validate port
  if (config.server.port < 1 || config.server.port > 65535) {
    throw new Error('Invalid port number');
  }

  // Validate OpenAI configuration
  if (config.openai.maxTokens < 1 || config.openai.maxTokens > 4000) {
    throw new Error('Invalid OpenAI max tokens');
  }

  if (config.openai.temperature < 0 || config.openai.temperature > 2) {
    throw new Error('Invalid OpenAI temperature');
  }

  // Validate rate limiting
  if (config.rateLimit.windowMs < 1000) {
    throw new Error('Rate limit window must be at least 1 second');
  }

  if (config.rateLimit.maxRequests < 1) {
    throw new Error('Rate limit max requests must be at least 1');
  }

  console.log('Configuration validated successfully');
}

// Run validation on import
validateConfig();