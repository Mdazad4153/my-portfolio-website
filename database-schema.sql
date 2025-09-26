-- Portfolio Website Database Schema for Supabase
-- Author: Md Azad

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_status BOOLEAN DEFAULT FALSE,
    response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    category VARCHAR(50) DEFAULT 'General',
    tags TEXT[],
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    author_id UUID
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    technologies TEXT[] NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold')),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    order_index INTEGER DEFAULT 0
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_position VARCHAR(100),
    client_company VARCHAR(100),
    client_avatar_url TEXT,
    testimonial_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    order_index INTEGER DEFAULT 0
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 100),
    icon_url TEXT,
    color_code VARCHAR(7),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work Experience Table
CREATE TABLE IF NOT EXISTS work_experience (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    current_job BOOLEAN DEFAULT FALSE,
    location VARCHAR(100),
    company_logo_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Education Table
CREATE TABLE IF NOT EXISTS education (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    current_student BOOLEAN DEFAULT FALSE,
    gpa DECIMAL(3,2),
    description TEXT,
    institution_logo_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(100) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id VARCHAR(100),
    credential_url TEXT,
    logo_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Analytics Table
CREATE TABLE IF NOT EXISTS site_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_url VARCHAR(255) NOT NULL,
    visitor_ip VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(255),
    visit_duration INTEGER, -- in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured, order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved, order_index);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category, order_index);
CREATE INDEX IF NOT EXISTS idx_work_experience_order ON work_experience(order_index);
CREATE INDEX IF NOT EXISTS idx_education_order ON education(order_index);
CREATE INDEX IF NOT EXISTS idx_certifications_order ON certifications(order_index);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- Contact Messages Policies
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contact messages" ON contact_messages
    FOR SELECT USING (auth.role() = 'authenticated');

-- Blog Posts Policies
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Only authenticated users can manage blog posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Projects Policies
CREATE POLICY "Anyone can view projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage projects" ON projects
    FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials Policies
CREATE POLICY "Anyone can view approved testimonials" ON testimonials
    FOR SELECT USING (approved = true);

CREATE POLICY "Only authenticated users can manage testimonials" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');

-- Skills Policies
CREATE POLICY "Anyone can view skills" ON skills
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage skills" ON skills
    FOR ALL USING (auth.role() = 'authenticated');

-- Work Experience Policies
CREATE POLICY "Anyone can view work experience" ON work_experience
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage work experience" ON work_experience
    FOR ALL USING (auth.role() = 'authenticated');

-- Education Policies
CREATE POLICY "Anyone can view education" ON education
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage education" ON education
    FOR ALL USING (auth.role() = 'authenticated');

-- Certifications Policies
CREATE POLICY "Anyone can view certifications" ON certifications
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage certifications" ON certifications
    FOR ALL USING (auth.role() = 'authenticated');

-- Site Analytics Policies
CREATE POLICY "Anyone can insert analytics data" ON site_analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view analytics" ON site_analytics
    FOR SELECT USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO skills (name, category, proficiency_level, color_code, order_index) VALUES
('HTML5', 'Frontend', 95, '#e34f26', 1),
('CSS3', 'Frontend', 90, '#1572b6', 2),
('JavaScript', 'Frontend', 85, '#f7df1e', 3),
('React', 'Frontend', 80, '#61dafb', 4),
('Vue.js', 'Frontend', 75, '#4fc08d', 5),
('Node.js', 'Backend', 80, '#339933', 6),
('Python', 'Backend', 70, '#3776ab', 7),
('MongoDB', 'Database', 75, '#47a248', 8),
('PostgreSQL', 'Database', 70, '#336791', 9),
('Figma', 'Design', 90, '#f24e1e', 10),
('Adobe XD', 'Design', 85, '#ff61f6', 11),
('Git', 'Tools', 80, '#f05032', 12),
('Docker', 'Tools', 65, '#2496ed', 13);

INSERT INTO work_experience (company_name, position, description, start_date, end_date, current_job, location, order_index) VALUES
('Tech Company', 'Senior Web Developer', 'Led development of 15+ web applications and mentored junior developers', '2022-01-01', NULL, true, 'Remote', 1),
('Digital Agency', 'Frontend Developer', 'Developed responsive web applications and collaborated with design team', '2021-01-01', '2021-12-31', false, 'Mumbai, India', 2);

INSERT INTO education (institution, degree, field_of_study, start_date, end_date, current_student, gpa, order_index) VALUES
('University Name', 'Bachelor of Technology', 'Computer Science', '2020-09-01', '2024-06-30', false, 3.8, 1);

INSERT INTO certifications (name, issuing_organization, issue_date, credential_url, order_index) VALUES
('Google UX Design Certificate', 'Google', '2023-06-01', 'https://coursera.org/verify/example', 1),
('AWS Certified Developer', 'Amazon Web Services', '2022-12-01', 'https://aws.amazon.com/verification', 2);

INSERT INTO testimonials (client_name, client_position, client_company, testimonial_text, rating, approved, order_index) VALUES
('Sarah Johnson', 'Product Manager', 'TechCorp', 'Md Azad is an exceptional developer with a keen eye for design. His ability to translate complex requirements into beautiful, functional applications is remarkable.', 5, true, 1),
('Michael Chen', 'CEO', 'StartupXYZ', 'Working with Azad was a pleasure. He delivered our project ahead of schedule and exceeded our expectations in terms of quality and attention to detail.', 5, true, 2),
('Emily Rodriguez', 'CTO', 'Digital Solutions', 'Azad''s expertise in both frontend and backend development made him the perfect choice for our full-stack project. Highly recommended!', 5, true, 3),
('David Kim', 'Founder', 'MobileFirst', 'The mobile app Azad developed for us has been a game-changer. His understanding of user experience and technical implementation is outstanding.', 5, true, 4);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

