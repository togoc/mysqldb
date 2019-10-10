# nodejs + mysql

### [下载地址](https://dev.mysql.com/downloads/mysql/)(用迅雷下快点)

### 安装过程

* 需要安装一些必要组件(在线会很慢,看需要先安装比较好)


### node连接配置

* 先买个数据库,配置好外网访问地址
* 服务器连接
  ```
    const mysql = require("mysql")
    var connection = mysql.createConnection({
        host: '',
        user: '',
        password: '',
        port: '',//不能直接在host后面加端口
        database: ''
    });
    connection.connect();
  ```