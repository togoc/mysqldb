const express = require("express")
const fs = require("fs")
const app = express()
const bodyparser = require('body-parser');
// 在Express 中 没有内置获取表单POST请求体的API，这里我们需要使用一个第三方的包 ：body-parser
//req.body 识别
app.use(bodyparser.urlencoded({ extende: true }));
app.use(bodyparser.json())
    //两种连接方式
const pool = require("./mysqldb/pool")
const terminate = require("./mysqldb/terminate")

//app路径设置
app.use('/', express.static('static/www'))
app.use('/static', express.static('static/'))







app.get("/table", (req, res) => {
    console.log(req.query.sentence)
    let sql = req.query.sentence
    if (req.query.code == "select") {
        pool(sql).then((re) => {
            res.send({ code: 1, data: re })
        })
    } else if (req.query.code == "insert") {
        console.log(req.query)
    } else {
        pool(sql).then((re) => {
            pool("select * from students").then((re) => {
                res.send({ code: 1, data: re })
            })
        })
    }


})

app.post("/insert", (req, res) => {
    pool(req.query.sentence, req.body).then((re) => {
        pool("select * from students").then((re) => {
            res.send({ code: 1, data: re })
        })
    })
})



app.listen(8080, function() {
    console.log("port 8080 !")
})