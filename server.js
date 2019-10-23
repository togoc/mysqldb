const express = require("express")
const fs = require("fs")
const app = express()
const bodyparser = require('body-parser');
// 在Express 中 没有内置获取表单POST请求体的API，这里我们需要使用一个第三方的包 ：body-parser
//req.body 识别
app.use(bodyparser.urlencoded({ extende: true }));
app.use(bodyparser.json())
    //两种连接方式
const terminate = require("./mysqldb/terminate")

//app路径设置
app.use('/', express.static('static/www'))
app.use('/static', express.static('static/'))

//数据库操作入口
app.use("/table", require("./components/control_sql"))






app.listen(8080, function() {
    console.log("port 8080 !")
})