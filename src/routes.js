import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailPage); 
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailPage); 

// error-handling routes
router.get('/test-error', testErrorPage);

router.get('/organization/:id', showOrganizationDetailsPage);

export default router;