const db = require('../config/db');

const customers = {
    create: async (data) => {
        // Check if the mobile number already exists
        const checkSql = 'SELECT COUNT(*) AS count FROM customers WHERE mobile = ?';
        try {
            const [checkResults] = await db.execute(checkSql, [data.mobile]);
            
            // If the mobile number exists, return an error response
            if (checkResults[0].count > 0) {
                return {
                    status: 'error',
                    message: 'Mobile number already exists'
                };
            }
    
            // If mobile number doesn't exist, proceed with the insertion
            const sql = 'INSERT INTO customers (email, mobile, name, businessname, businesscat, city, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
            const [results] = await db.execute(sql, [data.email, data.mobile, data.name, data.businessname, data.businesscat, data.city]);
    
            return {
                status: 'success',
                data: results
            };
        } catch (err) {
            // Handle any database errors
            throw err;
        }
    },    

    getAll: async () => {
        try {
            const [results] = await db.execute('SELECT * FROM customers ORDER BY created_at DESC');

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
        // Step 1: First, retrieve the current mobile number of the customer
        const checkMobileSql = 'SELECT mobile FROM customers WHERE id = ?';
        
        try {
            const [currentCustomer] = await db.execute(checkMobileSql, [id]);
    
            if (currentCustomer.length === 0) {
                return {
                    status: 'error',
                    message: 'Customer not found'
                };
            }
    
            const currentMobile = currentCustomer[0].mobile;
    
            // Step 2: If the mobile number is being updated, check if the new mobile already exists
            if (data.mobile !== currentMobile) {
                const checkNewMobileSql = 'SELECT COUNT(*) AS count FROM customers WHERE mobile = ?';
                const [mobileCheckResults] = await db.execute(checkNewMobileSql, [data.mobile]);
    
                if (mobileCheckResults[0].count > 0) {
                    return {
                        status: 'error',
                        message: 'Mobile number already exists'
                    };
                }
            }
    
            // Step 3: If no conflict, proceed with the update
            const sql = 'UPDATE customers SET email = ?, mobile = ?, name = ?, businessname = ?, businesscat = ?, city = ?, updated_at = NOW() WHERE id = ?';
            const [results] = await db.execute(sql, [data.email, data.mobile, data.name, data.businessname, data.businesscat, data.city, id]);
    
            return {
                status: 'success',
                data: results
            };
        } catch (err) {
            // Handle any unexpected errors
            throw err;
        }
    },
    delete: async (id) => {
        try {
            const [results] = await db.execute('DELETE FROM customers WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    findByMobile: async (Mobile) => {
        const sql = 'SELECT * FROM customers WHERE mobile = ?';
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
};

module.exports = customers;