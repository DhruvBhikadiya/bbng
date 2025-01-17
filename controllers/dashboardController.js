const Dashboard = require('../models/dashboardModel');

exports.adminDashboard = async (req, res) => {
  try {
    const results = await Dashboard.adminDashboard();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Dashboard:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.customerDashboard = async (req, res) => {
  let clientId = req.params.id;
  try {
    const results = await Dashboard.customerDashboard(clientId);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Dashboard:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};