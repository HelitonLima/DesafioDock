const mysql = require('./mysql').pool;

module.exports = () => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
            conn.query(
                'TRUNCATE TABLE conta',
                (error, result, field) => {
                    conn.release();
                }
            );
    })
}