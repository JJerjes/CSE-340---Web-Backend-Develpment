// Import any needed model functions
import { getAllProjects } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

// Define any controller functions
const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
  } catch (error) {
    next(error);
  }
};

// Nueva función: Muestra los detalles de un proyecto específico e incluye sus categorías
const showProjectDetailPage = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    // Obtener las categorías asociadas al proyecto usando el modelo
    const categories = await getCategoriesByProjectId(projectId);

    // Nota: Si ya tenías una función para obtener el detalle del proyecto por ID, la llamas aquí.
    // Pasamos el título, los datos del proyecto y el arreglo de categorías a la vista.
    res.render('project', {
      title: 'Project Details',
      projectId,
      categories
    });
  } catch (error) {
    next(error);
  }
};

// Export any controller functions
export { showProjectsPage, showProjectDetailPage };