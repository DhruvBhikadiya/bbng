const Customers = require('../models/customersModel');

exports.createCustomer = async (req, res) => {
    try {
        const result = await Customers.create(req.body);
        if(result.status == 'error'){
            res.status(409).json({ message: 'Customer Mobile Already Exist' });
        }else{
            res.status(201).json({ message: 'Customer created', id: result.insertId });
        }
    } catch (err) {
        console.error('Error creating Customer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const results = await Customers.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Customers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Customers.update(id, req.body);
        if(result.status == 'error'){
            res.status(409).json({ message: 'Customer Mobile Already Exist' });
        }else{
            res.status(200).json({ message: 'Customer updated' });
        }
    } catch (err) {
        console.error('Error updating Customer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        await Customers.delete(id);
        res.status(200).json({ message: 'Customer deleted' });
    } catch (err) {
        console.error('Error deleting Customer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginCustomer = async (req, res) => {
    try {
        const mobile = req.body.mobile;

        const Customer = await Customers.findByMobile(mobile); 
        if (!Customer || !Customer.data) {
            return res.status(404).json({ error: 'Member not found' });
        }
        
        res.status(200).json({
            message: 'Login successful',
            Customer: Customer.data,
        });

    } catch (err) {
        console.error('Error logging in Member:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};