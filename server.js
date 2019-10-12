const express = require("express")
const fs = require("fs")
const app = express()
//两种连接方式
const pool = require("./mysqldb/pool")
const terminate = require("./mysqldb/terminate")

//app路径设置
app.use('/', express.static('static'))
app.use('/static', express.static('static/'))


let post = { name: "唐国超" }

// let sql = 'delete  from students WHERE `姓名`= "唐国超" '
// let sql = 'select *  from students '
let sql = 'insert into students set ?'
// let sql = 'update students set ? where `name`= "tgc"'
pool(sql, post).then((re) => {
    console.log(re)
})
// terminate(sql).then((re) => {
//     console.log(re)
// })




app.get("/test", (req, res) => {
    let sql = "select * from students where '姓名'='唐国超 "
    pool(sql).then((re) => {
        res.send(re)
    })


})



app.listen(8080, function () {
    console.log("port 8080 !")
})





