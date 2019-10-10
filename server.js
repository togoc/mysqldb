const express = require("express")
const fs = require("fs")
const mysql = require("mysql")


var connection = mysql.createConnection({
    host: 'cdb-dwdx0mn8.bj.tencentcdb.com',
    user: 'root',
    password: 'tgc_423684',
    port: "10207",//不能直接在host后面加端口
    database: 'school'
});
connection.connect();
var sql = "SELECT * FROM students"
connection.query(sql, function (err, result) {
    if (err)
        console.log(err);
    console.log('The solution is: ', result[0]["姓名"]);
});
connection.end();