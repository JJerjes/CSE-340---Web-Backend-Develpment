CREATE TABLE IF NOT EXISTS organization (
  organization_id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  description TEXT,
  contact_email VARCHAR(250),
  logo_filename VARCHAR(250)
);
CREATE TABLE IF NOT EXISTS category (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(250) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS service_project (
  project_id SERIAL PRIMARY KEY,
  organization_id INT NOT NULL,
  title VARCHAR(250) NOT NULL,
  description TEXT,
  location TEXT,
  project_date DATE,
  CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS project_category (
  project_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (project_id, category_id),
  CONSTRAINT fk_project_category_project FOREIGN KEY (project_id) REFERENCES service_project(project_id) ON DELETE CASCADE,
  CONSTRAINT fk_project_category_category FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
  ),
  (
    'GreenHarvest Growers',
    'An urban farming collective promoting food security.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
  ),
  (
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local causes.',
    'hello@unityserve.org',
    'unityserve-logo.png'
  );
INSERT INTO category (category_name)
VALUES ('Environment'),
  ('Community Service'),
  ('Education');
INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    project_date
  )
VALUES (
    1,
    'Library Roof Waterproofing',
    'Repair and waterproof the public library roof before the rainy season.',
    'Benin City',
    '2026-11-05'
  ),
  (
    1,
    'Public Clinic Painting & Maintenance',
    'Repaint and sanitize the outpatient waiting room at the clinic.',
    'Benin City',
    '2026-11-12'
  ),
  (
    1,
    'Pedestrian Ramp Construction',
    'Build accessible concrete ramps for wheelchair users at the central plaza.',
    'Benin City',
    '2026-11-19'
  ),
  (
    1,
    'Primary School Fence Installation',
    'Erect a protective perimeter fence around the village primary school.',
    'Benin City',
    '2026-11-26'
  ),
  (
    1,
    'Bridge Security Handrail Repair',
    'Weld and reinforce safety railings on the neighborhood footbridge.',
    'Benin City',
    '2026-12-03'
  ),
  (
    2,
    'Composting Community Workshop',
    'Teach residents how to build home compost bins for organic waste.',
    'Benin City',
    '2026-12-10'
  ),
  (
    2,
    'Rainwater Harvesting Demo',
    'Install a rainwater collection tank to irrigate the community garden.',
    'Benin City',
    '2026-12-17'
  ),
  (
    2,
    'Riverbank Erosion Protection',
    'Plant native vetiver grass along riverbanks to prevent soil erosion.',
    'Benin City',
    '2027-01-07'
  ),
  (
    2,
    'Organic Pest Control Seminar',
    'Educate urban farmers on natural non-toxic pest management techniques.',
    'Benin City',
    '2027-01-14'
  ),
  (
    2,
    'Vertical Herb Wall Project',
    'Construct space-saving vertical wooden planter boxes for local homes.',
    'Benin City',
    '2027-01-21'
  ),
  (
    3,
    'Emergency Medical Kit Distribution',
    'Assemble and distribute basic first-aid supplies to local families.',
    'Benin City',
    '2027-01-28'
  ),
  (
    3,
    'School Supplies Drive',
    'Donate backpacks and stationery sets to underprivileged students.',
    'Benin City',
    '2027-02-04'
  ),
  (
    3,
    'Warm Blanket & Coat Collection',
    'Gather winter clothing and blankets for low-income senior citizens.',
    'Benin City',
    '2027-02-11'
  ),
  (
    3,
    'Youth Mentorship & Career Day',
    'Connect high school students with professionals for career guidance.',
    'Benin City',
    '2027-02-18'
  ),
  (
    3,
    'Community Hygiene & Dental Fair',
    'Provide free dental checkups and distribute hygiene kits to children.',
    'Benin City',
    '2027-02-25'
  );