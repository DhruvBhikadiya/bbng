const Appointments = require('../models/appointmentsModel');

exports.createAppointment = async (req, res) => {
    try {
        const result = await Appointments.create(req.body);
        res.status(201).json({ message: 'Appointment created', id: result.insertId });
    } catch (err) {
        console.error('Error creating Appointment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const results = await Appointments.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Appointments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAppointmentsByCompany = async (req, res) => {
    let id = req.params.id;
    try {
        const results = await Appointments.getAppointmentsByCompany(id);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Appointments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAppointmentById = async (req, res) => {
    let id = req.params.id;
    try {
        const results = await Appointments.getAppointmentById(id);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Appointments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAppointmentsByCustomer = async (req, res) => {
    let id = req.params.id;
    try {
        const results = await Appointments.getAppointmentsByCustomer(id);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Appointments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateAppointment = async (req, res) => {
    const id = req.params.id;
    try {
        await Appointments.update(id, req.body);
        res.status(200).json({ message: 'Appointment updated' });
    } catch (err) {
        console.error('Error updating Appointment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    const id = req.params.id;
    try {
        await Appointments.updateStatus(id, req.body);
        res.status(200).json({ message: 'Appointment Status Updated' });
    } catch (err) {
        console.error('Error updating Appointment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteAppointment = async (req, res) => {
    const id = req.params.id;
    try {
        await Appointments.delete(id);
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (err) {
        console.error('Error deleting Appointment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};