const db = require('../config/db');

const Users = {
    create: async (data) => {
        const sql = 'INSERT INTO users (email, password, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.email, data.password]);

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
            const [results] = await db.execute('SELECT * FROM users ORDER BY created_at DESC');

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
        const sql = 'UPDATE users SET email = ?, password = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.email, data.password, id]);

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
            const [results] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    findByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        try {
            
            const [results] = await db.execute(sql, [email]);
    
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

module.exports = Users;