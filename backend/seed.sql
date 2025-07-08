-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Insert one admin
INSERT INTO admin (email, password)
VALUES
('admin@example.com', crypt('admin123', gen_salt('bf')));

-- Insert contact info for that admin
INSERT INTO contact_info (admin_id, first_name, last_name, avatar, address, github_url, linkedin_url, twitter_url, phone, email)
SELECT id, 'John', 'Doe', 'https://example.com/avatar.jpg', '123 Main St, City', 'https://github.com/johndoe', 'https://linkedin.com/in/johndoe', 'https://twitter.com/johndoe', '123-456-7890', 'john.doe@example.com'
FROM admin WHERE email = 'admin@example.com';

-- Insert tags
INSERT INTO tags (title, slug) VALUES
('JavaScript', 'javascript'),
('Node.js', 'nodejs'),
('PostgreSQL', 'postgresql'),
('React', 'react');

-- Insert a blog post
INSERT INTO blogs (admin_id, title, meta_description, body, cover_image, is_published, is_featured, slug)
SELECT id, 
'My First Blog Post', 
'A short description about my first blog post.', 
'This is the **body** of my first blog post.', 
'https://example.com/cover.jpg', 
TRUE, TRUE, 'my-first-blog-post'
FROM admin WHERE email = 'admin@example.com';

-- Link blog tags
INSERT INTO blog_tags (blog_id, tag_id)
SELECT b.id, t.id
FROM blogs b, tags t
WHERE b.slug = 'my-first-blog-post' AND t.title IN ('JavaScript', 'Node.js');

-- Insert a project
INSERT INTO projects (admin_id, title, slug, meta_description, description, is_published, is_featured, media, github_url, live_demo_url)
SELECT id,
'Awesome Project',
'awesome-project',
'A great project built with Node.js and React.',
'This project is designed to showcase my skills.',
TRUE, TRUE,
'https://example.com/project-media.jpg',
'https://github.com/johndoe/awesome-project',
'https://awesome-project.example.com'
FROM admin WHERE email = 'admin@example.com';

-- Link project tags
INSERT INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p, tags t
WHERE p.slug = 'awesome-project' AND t.title IN ('Node.js', 'React');
