const db = require('../config/db');

const generalsetting = {
    getAll: async () => {
        try {
            const [results] = await db.execute('SELECT * FROM generalsetting');

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
        const sql = 'UPDATE generalsetting SET logo = ?, siteName = ?, email = ?, mobile = ?, address = ?, userappointmentlimit = ? WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.logo, data.siteName, data.email, data.mobile, data.address, data.userappointmentlimit, id]);
    
            let dataJSON = {
                status: 'success',
                data: results
            };
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    
};

module.exports = generalsetting;