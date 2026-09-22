// Import any needed model functions
import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

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

// Export any controller functions
export { showCategoriesPage, showCategoryDetailPage };