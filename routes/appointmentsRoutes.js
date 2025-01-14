const express = require('express');
const router = express.Router();
const AppointmentsController = require('../controllers/appointmentsController');

router.post('/createAppointment', AppointmentsController.createAppointment);
router.get('/getAllAppointments', AppointmentsController.getAllAppointments);
router.get('/getAppointmentsByCompany/:id', AppointmentsController.getAppointmentsByCompany);
router.get('/getAppointmentsByCustomer/:id', AppointmentsController.getAppointmentsByCustomer);
router.get('/getAppointmentById/:id', AppointmentsController.getAppointmentById);
router.put('/updateAppointment/:id', AppointmentsController.updateAppointment);
router.put('/updateAppointmentStatus/:id', AppointmentsController.updateAppointmentStatus);
router.delete('/deleteAppointment/:id', AppointmentsController.deleteAppointment);

module.exports = router;