import db from './db.js';

const getAllCategories = async () => {
  const query = `
    SELECT category_id, category_name
    FROM public.category
  `;

  const result = await db.query(query);
  return result.rows;
};

// 2. Recuperar una sola categoría por su ID
const getCategoryById = async (categoryId) => {
  try {
    const sql = 'SELECT * FROM category WHERE category_id = $1';
    const result = await db.query(sql, [categoryId]);
    return result.rows[0];
  } catch (error) {
    console.error('getCategoryById error: ' + error);
    throw error;
  }
};

const insertCategory = async (categoryName) => {
  try {
    const sql = 'INSERT INTO category (category_name) VALUES ($1) RETURNING *';
    const result = await db.query(sql, [categoryName]);
    return result.rows[0];
  } catch (error) {
    console.error('insertCategory error: ' + error);
    throw error;
  }
};

const updateCategory = async (categoryId, categoryName) => {
  try {
    const sql = 'UPDATE category SET category_name = $1 WHERE category_id = $2 RETURNING *';
    const result = await db.query(sql, [categoryName, categoryId]);
    return result.rows[0];
  } catch (error) {
    console.error('updateCategory error: ' + error);
    throw error;
  }
}

// 3. Recuperar todas las categorías de un proyecto dado
const getCategoriesByProjectId = async (projectId) => {
  try {
    const sql = `
      SELECT c.category_id, c.category_name 
      FROM category c
      JOIN project_category pc ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
    `;
    const result = await db.query(sql, [projectId]);
    return result.rows;
  } catch (error) {
    console.error('getCategoriesByProjectId error: ' + error);
    throw error;
  }
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
    INSERT INTO project_category (category_id, project_id)
    VALUES ($1, $2);
  `;

  await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  const deleteQuery = `
    DELETE FROM project_category
    WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [projectId]);

  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
}

export {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  getCategoriesByProjectId,
  updateCategoryAssignments,
};