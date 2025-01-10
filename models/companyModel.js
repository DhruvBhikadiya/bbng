const db = require('../config/db');

const company = {
    create: async (data) => {
        const sql = 'INSERT INTO company (name, password, lookingfor,products, mobile, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.name, data.password, data.lookingfor, data.products, data.mobile, data.description]);

            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err; // Propagate the error to be handled later
        }
    },

    getAll: async () => {
        try {
            const [results] = await db.execute('SELECT * FROM company ORDER BY created_at DESC');

            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    getCompanyById: async (id) => {
        try {
            // SQL query with placeholder for id
            const query = 'SELECT * FROM company WHERE company.id = ?';
            
            // Execute the query with the id parameter
            const [results] = await db.execute(query, [id]);
    
            // Return data in a JSON format
            let dataJSON = {
                status: 'success',
                data: results
            };
    
            return dataJSON;
        } catch (err) {
            // Handle errors and rethrow them
            throw err;
        }
    },
    

    update: async (id, data) => {
        const sql = 'UPDATE company SET name = ?, lookingfor = ?, products = ?, password = ?, mobile = ?, description = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.name, data.lookingfor, data.products, data.password, data.mobile, data.description, id]);

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
            const [results] = await db.execute('DELETE FROM company WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    findByMobile: async (Mobile) => {
        const sql = 'SELECT * FROM company WHERE mobile = ?';
        try {
            
            const [results] = await db.execute(sql, [Mobile]);
    
            if (results.length > 0) {
                return {
                    status: 'success',
                    data: results[0]
                };
            } else {
                return {
                    status: 'not_found',
                    data: null
                };
            }
        } catch (err) {
            throw err;
        }
    },    
    verifyPassword: async function (inputPassword, storedPassword) {
        try {
            return inputPassword === storedPassword;
        } catch (err) {
            throw err;
        }
    },    
};

module.exports = company;
