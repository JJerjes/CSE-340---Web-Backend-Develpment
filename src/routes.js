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

import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard,
  requireRole
} from './controllers/users.js';

const router = express.Router();

const categoryValidation = [
  body('category_name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be at least 3 characters long.')
];

// Public / General routes
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailPage); 

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailPage);

//--- ADMIN ONLY ROUTES (Protegidas con requireRole('admin')) ---

// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route for editing organization
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

//Routes for projects (Admin)
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Routes for categories (Admin)
router.get('/new-category', requireRole('admin'), renderNewCategory);
router.post('/new-category', requireRole('admin'), categoryValidation, handleNewCategory);

router.get('/edit-category/:id', requireRole('admin'), renderEditCategory);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, handleUpdateCategory);

// --- USER AUTHENTICATION ROUTES ---
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;