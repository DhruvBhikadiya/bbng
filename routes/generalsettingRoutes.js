const express = require('express');
const router = express.Router();
const GeneralsettingsController = require('../controllers/generalsettingController');

router.get('/getAllGeneralsettings', GeneralsettingsController.getAllGeneralsettings);
router.put('/updateGeneralsetting/:id', GeneralsettingsController.updateGeneralsetting);

module.exports = router;