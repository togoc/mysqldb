const mysql = require("mysql")


const options = {

    host: 'cdb-dwdx0mn8.bj.tencentcdb.com',
    user: 'root',
    password: 'tgc_423684',
    port: "10207",//不能直接在host后面加端口
    database: 'school'
}

function PoolConnection(options) {
    this.pool = mysql.createPool(options)
    this.name = 1
}

PoolConnection.prototype = {
    connection: function (sql) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err) throw err; // not connected!

                // Use the connection
                connection.query(sql, function (error, results) {
                    resolve(results)

                    // When done with the connection, release it.
                    connection.release();
                    // Handle error after the release.

                    if (error) throw error;
                    // Don't use the connection here, it has been returned to the pool.
                });
            })
        });
    }
}


module.exports = new PoolConnection(options)







