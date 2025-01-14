const Companys = require('../models/companyModel');

exports.createCompany = async (req, res) => {
    try {
        const result = await Companys.create(req.body);
        res.status(201).json({ message: 'Company created', id: result.insertId });
    } catch (err) {
        console.error('Error creating Company:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllCompanys = async (req, res) => {
    try {
        const results = await Companys.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Companys:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getCompanyById = async (req, res) => {
    let id = req.params.id;
    try {
        const results = await Companys.getCompanyById(id);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Company:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateCompany = async (req, res) => {
    const id = req.params.id;
    try {
        await Companys.update(id, req.body);
        res.status(200).json({ message: 'Company updated' });
    } catch (err) {
        console.error('Error updating Company:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteCompany = async (req, res) => {
    const id = req.params.id;
    try {
        await Companys.delete(id);
        res.status(200).json({ message: 'Company deleted' });
    } catch (err) {
        console.error('Error deleting Company:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body;        
        
        const Company = await Companys.findByMobile(String(email)); 
        if (!Company || !Company.data) {
            return res.status(404).json({ error: 'Company not found' });
        }
        
        if (password !== Company.data.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        res.status(200).json({
            message: 'Login successful',
            Company: Company.data,
        });

    } catch (err) {
        console.error('Error logging in Company:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};