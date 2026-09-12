CREATE TABLE IF NOT EXISTS organization (
  organization_id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  contact_email VARCHAR(250),
  logo_filename VARCHAR(250)
);
CREATE TABLE IF NOT EXISTS project (
  project_id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  description TEXT,
  organization_id INT REFERENCES organization(organization_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS category (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(250) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS project_category (
  project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
  category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);
INSERT INTO category (category_name)
VALUES ('Environment'),
  ('Community Service'),
  ('Education') ON CONFLICT (category_name) DO NOTHING;
INSERT INTO project_category (project_id, category_id)
VALUES (1, 1),
  (1, 2),
  (1, 3) ON CONFLICT DO NOTHING;