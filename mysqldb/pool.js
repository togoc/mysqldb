const mysql = require("mysql")


const options = {

    host: 'cdb-dwdx0mn8.bj.tencentcdb.com',
    user: 'root',
    password: 'tgc_423684',
    port: "10207",//不能直接在host后面加端口
    database: 'school'
}


const pool = mysql.createPool(options)

/**
 * 连接数据库,并查询
 * 返回一个包含结果的Promise对象
 * @param {string} sql sql语句
 */
const connection = function (sql, options) {
    return new Promise((resolve, reject) => {
        pool.on('acquire', function (connection) {
            console.log('Pool Connection %d acquired', connection.threadId);
        });
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            // Use the connection
            connection.query(sql, options, function (error, results) {
                resolve(results)

                // When done with the connection, release it.
                connection.release();
                // Handle error after the release.

                if (error) throw error;
                // Don't use the connection here, it has been returned to the pool.
            });
        })
        pool.on('release', function (connection) {
            console.log('Pool Connection %d released', connection.threadId);

        });

    });
}

// pool.end(function (err) {
//     console.log('Pool Connection end');
//     // all connections in the pool have ended
// });


module.exports = connection







