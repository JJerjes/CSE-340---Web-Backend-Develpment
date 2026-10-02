// Import any needed model functions
import {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  getCategoriesByProjectId,
  updateCategoryAssignments
} from '../models/categories.js';

import {
  getProjectsByCategoryId,
  getProjectDetails
} from '../models/projects.js';

import {
  validationResult
} from 'express-validator';

const renderNewCategory = (req, res) => {
  res.render('new-category', { 
    title: 'New Category', 
    category_name: '' 
  });
};

const handleNewCategory = async (req, res) => {
  const errors = validationResult(req);
  const { category_name } = req.body;

  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.render('new-category', {
      title: 'New Category',
      category_name
    });
  }

  try {
    await insertCategory(category_name);
    req.flash('success', 'Category created successfully.');
    res.redirect('/categories');
  } catch (error) {
    console.error('Error creating category:', error);
    req.flash('error', 'Database error creating category.');
    res.render('new-category', { 
      title: 'New Category', 
      category_name 
    });
  }
};

const renderEditCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    if (!category) {
      req.flash('error', 'Category not found.');
      return res.redirect('/categories');
    }

    res.render('edit-category', {
      title: 'Edit Category',
      category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).render('500');
  }
};

const handleUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.render('edit-category', {
      title: 'Edit Category',
      category: { category_id: id, category_name },
      category_name
    });
  }

  try {
    await updateCategory(id, category_name);
    req.flash('success', 'Category updated successfully.');
    res.redirect('/categories');
  } catch (error) {
    console.error('Error updating category:', error);
    req.flash('error', 'Failed to update category.');
    res.render('edit-category', {
      title: 'Edit Category',
      category: { category_id: id, category_name },
      category_name
    });
  }
};

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
  renderNewCategory,
  handleNewCategory,
  renderEditCategory,
  handleUpdateCategory,
  showCategoriesPage,
  showCategoryDetailPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm
};