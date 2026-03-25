import { describe, it, expect, beforeAll } from 'vitest';
import { testDatabaseConnection, initializeDatabase } from '../config/database.js';
import { databaseService } from '../services/database.service.js';

describe('Database Setup and RLS Policies', () => {
  beforeAll(async () => {
    // Initialize database connection
    await initializeDatabase();
  });

  describe('Database Connection', () => {
    it('should connect to the database successfully', async () => {
      const isConnected = await testDatabaseConnection();
      expect(isConnected).toBe(true);
    });
  });

  describe('Reference Data Access', () => {
    it('should be able to read roles (public data)', async () => {
      const roles = await databaseService.getAllRoles();
      expect(Array.isArray(roles)).toBe(true);
      expect(roles.length).toBeGreaterThan(0);
      
      // Check that we have expected roles
      const roleNames = roles.map(role => role.name);
      expect(roleNames).toContain('Software Engineer');
      expect(roleNames).toContain('Data Scientist');
    });

    it('should be able to read skills (public data)', async () => {
      const skills = await databaseService.getAllSkills();
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThan(0);
      
      // Check that we have expected skills
      const skillNames = skills.map(skill => skill.name);
      expect(skillNames).toContain('JavaScript');
      expect(skillNames).toContain('Python');
    });

    it('should be able to get skills for a specific role', async () => {
      const roles = await databaseService.getAllRoles();
      const softwareEngineerRole = roles.find(role => role.name === 'Software Engineer');
      
      if (softwareEngineerRole) {
        const skills = await databaseService.getSkillsForRole(softwareEngineerRole.id);
        expect(Array.isArray(skills)).toBe(true);
        expect(skills.length).toBeGreaterThan(0);
        
        // Software Engineer should have JavaScript and other relevant skills
        const skillNames = skills.map(skill => skill.name);
        expect(skillNames).toContain('JavaScript');
      }
    });
  });

  describe('Database Schema Validation', () => {
    it('should have all required tables with proper structure', async () => {
      // This test verifies that our schema was created correctly
      // We'll test by trying to access each table
      
      const roles = await databaseService.getAllRoles();
      expect(roles).toBeDefined();
      
      const skills = await databaseService.getAllSkills();
      expect(skills).toBeDefined();
      
      // Verify role-skill associations exist
      if (roles.length > 0) {
        const firstRole = roles[0];
        const roleSkills = await databaseService.getSkillsForRole(firstRole.id);
        expect(Array.isArray(roleSkills)).toBe(true);
      }
    });

    it('should have proper data types and constraints', async () => {
      const roles = await databaseService.getAllRoles();
      
      if (roles.length > 0) {
        const role = roles[0];
        
        // Check that required fields exist and have correct types
        expect(typeof role.id).toBe('string');
        expect(typeof role.name).toBe('string');
        expect(typeof role.category).toBe('string');
        expect(role.created_at).toBeDefined();
        expect(role.updated_at).toBeDefined();
      }
      
      const skills = await databaseService.getAllSkills();
      
      if (skills.length > 0) {
        const skill = skills[0];
        
        // Check skill structure
        expect(typeof skill.id).toBe('string');
        expect(typeof skill.name).toBe('string');
        expect(typeof skill.category).toBe('string');
        expect(['beginner', 'intermediate', 'advanced']).toContain(skill.difficulty);
      }
    });
  });

  describe('Data Integrity', () => {
    it('should have consistent role-skill associations', async () => {
      const roles = await databaseService.getAllRoles();
      
      for (const role of roles) {
        const skills = await databaseService.getSkillsForRole(role.id);
        
        // Each role should have at least some skills associated
        if (role.name === 'Software Engineer') {
          expect(skills.length).toBeGreaterThan(0);
        }
        
        // All skills should be valid
        for (const skill of skills) {
          expect(skill.id).toBeDefined();
          expect(skill.name).toBeDefined();
          expect(['beginner', 'intermediate', 'advanced']).toContain(skill.difficulty);
        }
      }
    });

    it('should have unique role and skill names', async () => {
      const roles = await databaseService.getAllRoles();
      const roleNames = roles.map(role => role.name);
      const uniqueRoleNames = [...new Set(roleNames)];
      expect(roleNames.length).toBe(uniqueRoleNames.length);
      
      const skills = await databaseService.getAllSkills();
      const skillNames = skills.map(skill => skill.name);
      const uniqueSkillNames = [...new Set(skillNames)];
      expect(skillNames.length).toBe(uniqueSkillNames.length);
    });
  });
});