const express = require("express")
const fs = require("fs")
const pool = require("./mysqldb/pool")
const app = express()

app.use('/', express.static('static'))
app.use('/static', express.static('static/'))







// const mysql = require("mysql")


// const options = {

//     host: 'cdb-dwdx0mn8.bj.tencentcdb.com',
//     user: 'root',
//     password: 'tgc_423684',
//     port: "10207",//不能直接在host后面加端口
//     database: 'school'
// }

// const connection = mysql.createConnection(options)
// const pool = mysql.createPool(options)




app.get("/test", (req, res) => {
    pool.connection(sql).then((re) => {
        res.send(re)
    })


})
var sql = "SELECT * FROM students"
// console.log(pool.connection(sql))

// var sql = "SELECT * FROM students"
// pool.query(sql, function (err, result) {
//     if (err)
//         console.log(err);
//     console.log('The solution is: ', result[0]["姓名"]);
// });



app.listen(8080, function () {
    console.log("port 8080 !")
})





