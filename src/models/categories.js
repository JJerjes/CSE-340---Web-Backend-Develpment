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

export { getAllCategories, getCategoryById, getCategoriesByProjectId };

