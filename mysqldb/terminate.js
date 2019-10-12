const mysql = require("mysql")


const options = {

    host: 'cdb-dwdx0mn8.bj.tencentcdb.com',
    user: 'root',
    password: 'tgc_423684',
    port: "10207",//不能直接在host后面加端口
    database: 'school'
}
const connection = mysql.createConnection(options)
connection.connect();
var sql = "SELECT * FROM students"
connection.query(sql, function (err, result) {
    if (err)
        console.log(err);
    console.log('The solution is: ', result[0]["姓名"]);
});
// connection.end()


const connection = mysql.createConnection(options)
// connection.connect();
var sql = "SELECT * FROM students"
connection.query(sql, function (err, result) {
    if (err)
        console.log(err);
    console.log('The solution is: ', result[0]["姓名"]);
});
// connection.end()

// module.exports = mysql.createConnection(options);