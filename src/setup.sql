CREATE TABLE IF NOT EXISTS organization (
  organization_id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  contact_email VARCHAR(250),
  logo_filename VARCHAR(250)
);
CREATE TABLE IF NOT EXISTS project (
  project_id SERIAL PRIMARY KEY,
  organization_id INT REFERENCES organization(organization_id) ON DELETE CASCADE,
  title VARCHAR(250) NOT NULL,
  description TEXT,
  location VARCHAR(250) NOT NULL,
  date DATE NOT NULL
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
  ) ON CONFLICT (name) DO NOTHING;
INSERT INTO project (
    organization_id,
    title,
    description,
    location,
    date
  )
VALUES (
    1,
    'Access Ramp Construction',
    'Installation of a wooden ramp for the community center.',
    '123 Main Street',
    '2026-10-15'
  ),
  (
    1,
    'School Roof Repair',
    'Preventive maintenance before the rainy season.',
    '456 Central Ave',
    '2026-11-01'
  ),
  (
    1,
    'Facade Painting',
    'Restoration of exterior paint at the neighborhood park.',
    '789 Los Olivos St',
    '2026-11-10'
  ),
  (
    1,
    'Bench Restoration',
    'Sanding and varnishing of local park benches.',
    'Main Square',
    '2026-12-01'
  ),
  (
    1,
    'Urban Garden Construction',
    'Assembly of wooden raised garden beds.',
    '101 Sun Ave',
    '2026-12-05'
  ),
  (
    2,
    'Home Composting Workshop',
    'Training on organic waste management.',
    'Eco Park',
    '2026-10-20'
  ),
  (
    2,
    'Native Tree Planting',
    'Community reforestation day.',
    'Green Hills',
    '2026-10-28'
  ),
  (
    2,
    'School Garden Cleanup',
    'Weed removal and soil preparation.',
    'Elementary School #12',
    '2026-11-15'
  ),
  (
    2,
    'Vertical Garden Workshop',
    'Teaching cultivation in small spaces.',
    'North Community Center',
    '2026-11-20'
  ),
  (
    2,
    'Seed Collection',
    'Sorting and packaging seeds for the community.',
    'Central Greenhouse',
    '2026-12-02'
  ),
  (
    3,
    'Non-Perishable Food Drive',
    'Sorting donations for soup kitchens.',
    'Municipal Gym',
    '2026-10-12'
  ),
  (
    3,
    'Children Reading Day',
    'Accompanying children at the public library.',
    'Community Library',
    '2026-10-25'
  ),
  (
    3,
    'Blanket and Quilt Delivery',
    'Distribution of warm clothes for senior citizens.',
    'San Jose Nursing Home',
    '2026-11-05'
  ),
  (
    3,
    'Digital Skills Workshop',
    'Teaching basic computer usage.',
    'Tech Center',
    '2026-11-18'
  ),
  (
    3,
    'Board Game Afternoon',
    'Integration activity for youth.',
    'Youth Center',
    '2026-12-10'
  ) ON CONFLICT DO NOTHING;
INSERT INTO category (category_name)
VALUES ('Environment'),
  ('Community Service'),
  ('Education') ON CONFLICT (category_name) DO NOTHING;
INSERT INTO project_category (project_id, category_id)
VALUES (1, 2),
  (2, 2),
  (6, 1),
  (7, 1),
  (12, 3),
  (14, 3) ON CONFLICT DO NOTHING;