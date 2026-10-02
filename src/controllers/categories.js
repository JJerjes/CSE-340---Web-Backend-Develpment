// Import any needed model functions
import {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  updateCategoryAssignments
} from '../models/categories.js';

import {
  getProjectsByCategoryId,
  getProjectDetails
} from '../models/projects.js';

// Define any controller functions
const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
  } catch (error) {
    next(error);
  }
};

// Nueva función para la página de detalles de la categoría (/category/:id)
const showCategoryDetailPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    if (!category) {
      const error = new Error('Category not found');
      error.status = 404;
      return next(error);
    }

    res.render('category', {
      title: category.category_name,
      category,
      projects
    });
  } catch (error) {
    next(error);
  }
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);

  const title = 'Assign Categories to Project';

  res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];
  const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, categoryIdsArray);
  req.flash('success', 'Categories updated successfully.');
  res.redirect(`/project/${projectId}`);
}

// Export any controller functions
export {
  showCategoriesPage,
  showCategoryDetailPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm
};