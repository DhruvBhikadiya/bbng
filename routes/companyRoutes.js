const express = require('express');
const router = express.Router();
const CompanysController = require('../controllers/companyController');

router.post('/createCompany', CompanysController.createCompany);
router.get('/getAllCompanys', CompanysController.getAllCompanys);
router.post('/loginCompany', CompanysController.loginCompany);
router.get('/getCompanyById/:id', CompanysController.getCompanyById);
router.put('/updateCompany/:id', CompanysController.updateCompany);
router.delete('/deleteCompany/:id', CompanysController.deleteCompany);

module.exports = router;