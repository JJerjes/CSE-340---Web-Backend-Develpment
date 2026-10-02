import db from './db.js';

const getAllProjects = async () => {

  const query = `
    SELECT
      service_project.project_id,
      service_project.organization_id,
      service_project.title,
      service_project.description,
      service_project.location,
      service_project.project_date AS date,
      organization.name AS organization_name
    FROM service_project 
    INNER JOIN organization 
      ON service_project.organization_id = organization.organization_id
    ORDER BY service_project.project_date ASC;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      project_date AS date
    FROM service_project
    WHERE organization_id = $1
    ORDER BY project_date ASC;  
  `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
}

const getProjectsByCategoryId = async (categoryId) => {
  try {
    const sql = `
      SELECT sp.project_id, sp.title, sp.description, sp.location, sp.project_date, o.name AS organization_name
      FROM service_project sp
      JOIN project_category pc ON sp.project_id = pc.project_id
      JOIN organization o ON sp.organization_id = o.organization_id
      WHERE pc.category_id = $1
    `;
    const result = await db.query(sql, [categoryId]);
    return result.rows;
  } catch (error) {
    console.error('getProjectsByCategoryId error: ' + error);
    throw error;
  }
};

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
    INSERT INTO service_project (title, description, location, project_date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
  `;

  const queryParams = [title, description, location, date, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
}

const getProjectDetails = async (projectId) => {
  try {
    const sql = `
      SELECT
        service_project.project_id,
        service_project.organization_id,
        service_project.title,
        service_project.description,
        service_project.location,
        service_project.project_date,
        organization.name
      FROM service_project
      LEFT JOIN organization ON service_project.organization_id = organization.organization_id
      WHERE service_project.project_id = $1;
    `;
    const result = await db.query(sql, [projectId]);
    return result.rows[0];
  } catch (error) {
    console.error('getProjectDetails error: ' + error);
    throw error;
  }
};

const updateProject = async (projectId, title, description, location, projectDate, organizationId) => {
  const sql = `
    UPDATE service_project
    SET title = $1,
      description = $2,
      location = $3,
      project_date = $4,
      organization_id = $5
    WHERE project_id = $6
    RETURNING *;  
  `;

  const result = await db.query(sql, [title, description, location, projectDate, organizationId, projectId]);

  if (result.rowCount === 0) {
    throw new Error(`Project with ID ${projectId} not found.`);
  }

  return result.rows[0];

}

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getProjectsByCategoryId,
  createProject,
  getProjectDetails,
  updateProject
};