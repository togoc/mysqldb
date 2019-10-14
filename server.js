const express = require("express")
const fs = require("fs")
const app = express()
//两种连接方式
const pool = require("./mysqldb/pool")
const terminate = require("./mysqldb/terminate")

//app路径设置
app.use('/', express.static('static/www'))
app.use('/static', express.static('static/'))





app.get("/table", (req, res) => {
    console.log(req.query.sentence)
    let sql = req.query.sentence
    pool(sql).then((re) => {
        res.send(re)
    })


})




app.listen(8080, function () {
    console.log("port 8080 !")
})





