const Generalsettings = require('../models/generalsettingModel');

exports.getAllGeneralsettings = async (req, res) => {
    try {
        const results = await Generalsettings.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Generalsettings:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateGeneralsetting = async (req, res) => {
    const id = req.params.id;
    try {
        await Generalsettings.update(id, req.body);
        res.status(200).json({ message: 'Generalsetting updated' });
    } catch (err) {
        console.error('Error updating Generalsetting:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};