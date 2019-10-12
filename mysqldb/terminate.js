const mysql = require("mysql")


const options = {

    host: 'cdb-dwdx0mn8.bj.tencentcdb.com',
    user: 'root',
    password: 'tgc_423684',
    port: "10207",//不能直接在host后面加端口
    database: 'school'
}

/**
 * 连接数据库,并查询
 * 返回一个包含结果的Promise对象
 * @param {string} sql sql语句
 */
function connect(sql, option) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(options)
        connection.connect((err) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });

        connection.query(sql, option, function (err, result) {
            if (err)
                console.log(err);
            resolve(result)
            // console.log('The solution is: ', result);
        });
        connection.end()
    })

}

module.exports = connect