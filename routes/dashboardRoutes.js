const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');

router.get('/superAdminDashboard', DashboardController.superadminDashboard);
router.get('/companyDashboard/:companyId', DashboardController.companyDashboard);

module.exports = router;