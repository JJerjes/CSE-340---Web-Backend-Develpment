import express from 'express';
import { body } from 'express-validator';

import {
  showHomePage
} from './controllers/index.js';

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm
} from './controllers/organizations.js';

import {
  showProjectsPage,
  showProjectDetailPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
  showEditProjectForm,
  processEditProjectForm
} from './controllers/projects.js';

import {
  showCategoriesPage,
  showCategoryDetailPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  renderNewCategory,
  handleNewCategory,
  renderEditCategory,
  handleUpdateCategory
} from './controllers/categories.js';

import {
  testErrorPage
} from './controllers/errors.js';

const router = express.Router();

const categoryValidation = [
  body('category_name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be at least 3 characters long.')
];

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);

router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation,processEditOrganizationForm);

router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm)

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailPage); 

//Rutas para crear nuevos proyectos
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);

//Rutas para editar un proyecto
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

//Rutas de categorias
router.get('/categories', showCategoriesPage);

//Rutas para crear categoria
router.get('/new-category', renderNewCategory);
router.post('/new-category', categoryValidation, handleNewCategory);

//Rutas para editar categoria
router.get('/edit-category/:id', renderEditCategory);
router.post('/edit-category/:id', categoryValidation, handleUpdateCategory);

router.get('/category/:id', showCategoryDetailPage); 

// error-handling routes
router.get('/test-error', testErrorPage);


export default router;