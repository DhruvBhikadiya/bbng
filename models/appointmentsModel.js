const db = require('../config/db');

const appointment = {
    create: async (data) => {
        const sql = 'INSERT INTO appointment (customerId, companyId, companyReason,customerReason, status, timeslot, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.customerId, data.companyId, data.companyReason, data.customerReason, data.status, data.timeslot]);

            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    getAll: async () => {
        try {
            const query = `
                SELECT 
                    appointment.*, 
                    customers.name AS customerName, 
                    company.name AS companyName
                FROM appointment
                LEFT JOIN customers ON appointment.customerId = customers.id
                LEFT JOIN company ON appointment.companyId = company.id
                ORDER BY created_at DESC
            `;
            
            const [results] = await db.execute(query);
    
            let dataJSON = {
                status: 'success',
                data: results
            };
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    getAppointmentsByCompany: async (id) => {
        try {
            const query = `
                SELECT 
                    appointment.*, 
                    customers.name AS customerName, 
                    company.name AS companyName
                FROM appointment
                LEFT JOIN customers ON appointment.customerId = customers.id
                LEFT JOIN company ON appointment.companyId = company.id
                WHERE appointment.companyId = ?
                ORDER BY appointment.created_at DESC
            `;

            const [results] = await db.execute(query, [id]);

            let dataJSON = {
                status: 'success',
                data: results
            };
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },    
    getAppointmentById: async (id) => {
        try {
            const query = `
                SELECT 
                    appointment.*, 
                    customers.name AS customerName, 
                    company.name AS companyName
                FROM appointment
                LEFT JOIN customers ON appointment.customerId = customers.id
                LEFT JOIN company ON appointment.companyId = company.id
                WHERE appointment.id = ?
                ORDER BY appointment.created_at DESC
            `;

            const [results] = await db.execute(query, [id]);

            let dataJSON = {
                status: 'success',
                data: results
            };
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },    
    getAppointmentsByCustomer: async (id) => {
        try {
            const query = `
                SELECT 
                    appointment.*, 
                    customers.name AS customerName, 
                    company.name AS companyName
                FROM appointment
                LEFT JOIN customers ON appointment.customerId = customers.id
                LEFT JOIN company ON appointment.companyId = company.id
                WHERE appointment.customerId = ?
                ORDER BY appointment.created_at DESC
            `;

            const [results] = await db.execute(query, [id]);

    
            let dataJSON = {
                status: 'success',
                data: results
            };
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },    

    update: async (id, data) => {
        const sql = 'UPDATE appointment SET customerId = ?, companyId = ?, companyReason = ?, customerReason = ?, status = ?, timeslot = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.customerId, data.companyId, data.companyReason, data.customerReason, data.status, data.timeslot, id]);

            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    updateStatus: async (id, data) => {
        const sql = 'UPDATE appointment SET status = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.status, id]);

            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    delete: async (id) => {
        try {
            const [results] = await db.execute('DELETE FROM appointment WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },
};

module.exports = appointment;