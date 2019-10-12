const express = require("express")
const fs = require("fs")
const app = express()
//两种连接方式
const pool = require("./mysqldb/pool")
const terminate = require("./mysqldb/terminate")

//app路径设置
app.use('/', express.static('static'))
app.use('/static', express.static('static/'))


// let options = { name: "tgc" }

// // let sql = 'delete  from students '//删除表所有
// // let sql = 'delete  from students where ? '//删除满足条件的所有记录
// // let sql = 'select *  from students where `name`="唐国超"' //查询满足条件的所有记录
// let sql = 'select *  from students where ?' //查询满足条件 + options
// // let sql = 'insert into students set ?'//表添加记录 + options
// // let sql = 'update students set ? where `name`= "唐国超"'//修改所有满足条件
let sql = 'select * from students where age between 10 and 20'

pool(sql).then((re) => {
    console.log(re)
})
// terminate(sql).then((re) => {
//     console.log(re)
// })




app.get("/test", (req, res) => {
    let sql = "select * from students "
    pool(sql).then((re) => {
        res.send(re)
    })


})



app.listen(8080, function () {
    console.log("port 8080 !")
})




