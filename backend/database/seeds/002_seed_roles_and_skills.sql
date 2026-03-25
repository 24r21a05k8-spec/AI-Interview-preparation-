-- Seed data for roles and skills
-- This file populates the database with initial roles and skills data

-- Insert roles
INSERT INTO roles (name, description, category) VALUES
('Software Engineer', 'Full-stack software development with focus on web applications', 'Engineering'),
('Frontend Developer', 'User interface and user experience development', 'Engineering'),
('Backend Developer', 'Server-side development and API design', 'Engineering'),
('DevOps Engineer', 'Infrastructure, deployment, and system operations', 'Engineering'),
('Data Scientist', 'Data analysis, machine learning, and statistical modeling', 'Data'),
('Data Engineer', 'Data pipeline development and data infrastructure', 'Data'),
('Product Manager', 'Product strategy, roadmap planning, and stakeholder management', 'Product'),
('System Architect', 'System design and architectural decision making', 'Architecture'),
('Mobile Developer', 'iOS and Android application development', 'Engineering'),
('QA Engineer', 'Quality assurance, testing, and automation', 'Engineering');

-- Insert skills
INSERT INTO skills (name, description, category, difficulty) VALUES
-- Programming Languages
('JavaScript', 'Dynamic programming language for web development', 'Programming Languages', 'beginner'),
('TypeScript', 'Typed superset of JavaScript', 'Programming Languages', 'intermediate'),
('Python', 'High-level programming language for various applications', 'Programming Languages', 'beginner'),
('Java', 'Object-oriented programming language', 'Programming Languages', 'intermediate'),
('C++', 'Systems programming language', 'Programming Languages', 'advanced'),
('Go', 'Modern systems programming language', 'Programming Languages', 'intermediate'),
('Rust', 'Systems programming language focused on safety', 'Programming Languages', 'advanced'),
('Swift', 'Programming language for iOS development', 'Programming Languages', 'intermediate'),
('Kotlin', 'Modern programming language for Android development', 'Programming Languages', 'intermediate'),

-- Frontend Technologies
('React', 'JavaScript library for building user interfaces', 'Frontend', 'intermediate'),
('Vue.js', 'Progressive JavaScript framework', 'Frontend', 'intermediate'),
('Angular', 'TypeScript-based web application framework', 'Frontend', 'intermediate'),
('HTML/CSS', 'Markup and styling languages for web', 'Frontend', 'beginner'),
('Tailwind CSS', 'Utility-first CSS framework', 'Frontend', 'beginner'),
('SASS/SCSS', 'CSS preprocessor', 'Frontend', 'intermediate'),

-- Backend Technologies
('Node.js', 'JavaScript runtime for server-side development', 'Backend', 'intermediate'),
('Express.js', 'Web framework for Node.js', 'Backend', 'intermediate'),
('Django', 'Python web framework', 'Backend', 'intermediate'),
('Flask', 'Lightweight Python web framework', 'Backend', 'beginner'),
('Spring Boot', 'Java framework for building applications', 'Backend', 'intermediate'),
('FastAPI', 'Modern Python web framework', 'Backend', 'intermediate'),

-- Databases
('PostgreSQL', 'Advanced open-source relational database', 'Database', 'intermediate'),
('MySQL', 'Popular relational database management system', 'Database', 'beginner'),
('MongoDB', 'NoSQL document database', 'Database', 'intermediate'),
('Redis', 'In-memory data structure store', 'Database', 'intermediate'),
('Elasticsearch', 'Search and analytics engine', 'Database', 'advanced'),

-- Cloud & DevOps
('AWS', 'Amazon Web Services cloud platform', 'Cloud', 'intermediate'),
('Azure', 'Microsoft cloud platform', 'Cloud', 'intermediate'),
('Google Cloud', 'Google cloud platform', 'Cloud', 'intermediate'),
('Docker', 'Containerization platform', 'DevOps', 'intermediate'),
('Kubernetes', 'Container orchestration platform', 'DevOps', 'advanced'),
('CI/CD', 'Continuous Integration and Continuous Deployment', 'DevOps', 'intermediate'),
('Terraform', 'Infrastructure as Code tool', 'DevOps', 'advanced'),

-- Data & Analytics
('SQL', 'Structured Query Language for databases', 'Data', 'beginner'),
('Pandas', 'Python data manipulation library', 'Data', 'intermediate'),
('NumPy', 'Python numerical computing library', 'Data', 'intermediate'),
('Machine Learning', 'Algorithms and statistical models', 'Data', 'advanced'),
('TensorFlow', 'Machine learning framework', 'Data', 'advanced'),
('PyTorch', 'Machine learning framework', 'Data', 'advanced'),
('Apache Spark', 'Unified analytics engine for big data', 'Data', 'advanced'),

-- System Design & Architecture
('System Design', 'Designing scalable distributed systems', 'Architecture', 'advanced'),
('Microservices', 'Architectural pattern for distributed systems', 'Architecture', 'advanced'),
('API Design', 'Designing RESTful and GraphQL APIs', 'Architecture', 'intermediate'),
('Database Design', 'Designing efficient database schemas', 'Architecture', 'intermediate'),
('Caching', 'Data caching strategies and implementation', 'Architecture', 'intermediate'),
('Load Balancing', 'Distributing workloads across multiple resources', 'Architecture', 'advanced'),

-- Testing & Quality
('Unit Testing', 'Testing individual components in isolation', 'Testing', 'beginner'),
('Integration Testing', 'Testing component interactions', 'Testing', 'intermediate'),
('End-to-End Testing', 'Testing complete user workflows', 'Testing', 'intermediate'),
('Test Automation', 'Automated testing frameworks and tools', 'Testing', 'intermediate'),
('Performance Testing', 'Testing system performance and scalability', 'Testing', 'advanced'),

-- Soft Skills & Process
('Agile/Scrum', 'Agile development methodologies', 'Process', 'beginner'),
('Git', 'Version control system', 'Tools', 'beginner'),
('Problem Solving', 'Analytical and critical thinking skills', 'Soft Skills', 'intermediate'),
('Communication', 'Technical communication and collaboration', 'Soft Skills', 'beginner'),
('Leadership', 'Team leadership and mentoring', 'Soft Skills', 'advanced');

-- Create role-skill associations
INSERT INTO role_skills (role_id, skill_id) 
SELECT r.id, s.id FROM roles r, skills s WHERE 
    (r.name = 'Software Engineer' AND s.name IN ('JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'PostgreSQL', 'Git', 'System Design', 'Unit Testing', 'API Design')) OR
    (r.name = 'Frontend Developer' AND s.name IN ('JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'HTML/CSS', 'Tailwind CSS', 'SASS/SCSS', 'Git', 'Unit Testing')) OR
    (r.name = 'Backend Developer' AND s.name IN ('JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js', 'Express.js', 'Django', 'PostgreSQL', 'MySQL', 'API Design', 'Git', 'Unit Testing')) OR
    (r.name = 'DevOps Engineer' AND s.name IN ('Python', 'Go', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Git', 'System Design')) OR
    (r.name = 'Data Scientist' AND s.name IN ('Python', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Git', 'Problem Solving')) OR
    (r.name = 'Data Engineer' AND s.name IN ('Python', 'Java', 'SQL', 'PostgreSQL', 'MongoDB', 'Apache Spark', 'AWS', 'Docker', 'Git', 'System Design')) OR
    (r.name = 'Product Manager' AND s.name IN ('SQL', 'Problem Solving', 'Communication', 'Leadership', 'Agile/Scrum', 'System Design')) OR
    (r.name = 'System Architect' AND s.name IN ('Java', 'Python', 'System Design', 'Microservices', 'API Design', 'Database Design', 'Caching', 'Load Balancing', 'AWS', 'Problem Solving')) OR
    (r.name = 'Mobile Developer' AND s.name IN ('Swift', 'Kotlin', 'JavaScript', 'React', 'Git', 'Unit Testing', 'API Design', 'Problem Solving')) OR
    (r.name = 'QA Engineer' AND s.name IN ('JavaScript', 'Python', 'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'Test Automation', 'Performance Testing', 'Git', 'Problem Solving'));