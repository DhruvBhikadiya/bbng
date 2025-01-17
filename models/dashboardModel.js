const db = require('../config/db');

const Dashboard = {
  superadminDashboard: async () => {
    try {
      const [company] = await db.execute(`SELECT COUNT(*) AS row_count FROM company`);
      const [customers] = await db.execute(`SELECT COUNT(*) AS row_count FROM customers`);
      const [appointment] = await db.execute(`SELECT COUNT(*) AS row_count FROM appointment`);
      const [latestCompany] = await db.execute('SELECT * FROM company ORDER BY created_at DESC LIMIT 10');
      const [latestCustomer] = await db.execute('SELECT * FROM customers ORDER BY created_at DESC LIMIT 10');

      let dashboardJson = [
        {
          totalCompany: company[0].row_count,
          totalCustomers: customers[0].row_count,
          totalAppointment: appointment[0].row_count,
          latestCompany : latestCompany,
          latestCustomer : latestCustomer,
        }
      ]

      let dataJSON = {
        status: 'success',
        data: dashboardJson
      };
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
  companyDashboard: async (companyId) => {
    try {
      const [appointment] = await db.execute(`SELECT COUNT(*) AS row_count FROM appointment WHERE companyId = ?`, [companyId]);
      const [appointmentList] = await db.execute(`SELECT * FROM appointment WHERE companyId = ?`, [companyId]);

      let dashboardJson = [
        {
          totalAppointment: appointment[0].row_count,
          appointmentList: appointmentList
        }
      ];

      return {
        status: 'success',
        data: dashboardJson
      };

    } catch (error) {
      // Handle errors if any
      console.error(error);
      return {
        status: 'error',
        message: 'Failed to fetch dashboard data.'
      };
    }
  },
};

module.exports = Dashboard;