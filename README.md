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

### SQL语言

#### DDL: 数据库定义语言,主要对数据库,数据库表进行创建删除

| 关键字 | 作用           | 例子 |
| :----: | :------------- | :--- |
| create | 创建表或数据库 | `cr` |
| alert  | 修改表         |      |
|  drop  | 删除表         |      |
|  show  | 查询表         |      |

* 创建数据库,不带编码选默认.

```
CREATE database 数据库名 charset 编码;
```

* 创建表.

```
CREATE TABLE teacher(
    -- 字段名1 数据类型1(长度) 约束 
    tid int(11) PRIMARY KEY,
    -- 字段名2 数据类型2(长度) 默认值 
    gender varchar(10) default'男' check(gender='男' or gender='女')
    )
```


#### DCL: 数据库操控语言,控制数据库访问权限
  * 添加用户:
    * `create user '用户名'@'主机名' identified by '密码'` 
  * 删除用户:
  * 修改用户密码:
  * 查询用户
    * 1. 切换到mysql数据库 `use mysql`
    * 2. 查询用户表 `select * from user`
    * 通配符: % 表示可以再任意主机使用用户登录数据库




#### DML: 数据库操作语言,对表中数据进行,增删改查
#### DQL: 数据库查询语言,对表中数据进行 查询


* [官方文档](https://www.npmjs.com/package/mysql#escaping-query-values)
* `connection.query('SELECT * FROM students WHERE id = ?', [userId],function())`
* `connection.query('SELECT * FROM students WHERE ?', {id:'要查询的值'},function())`
* `connection.query('SELECT * FROM ? WHERE id=?', [students,'要查询的值'],function())`
  
  
|                           命令                           |                   操作                   |
| :------------------------------------------------------: | :--------------------------------------: |
|                 `delete  from students`                  |                删除表所有                |
|           `select *  from students where ?=?`            | 查询满足条件的所有记录,或者后面加options |
|            `delete  from students where ?=?`             | 删除所有满足条件的记录,或者后面加options |
|              `insert into students set ?=?`              | 删除所有满足条件的记录,或者后面加options |
|          `select * from students where age>10`           |                 条件查询                 |
|      `select * from students where age in (18,20)`       |      查询在指定集合内满足条件的记录      |
|    `select * from students where age not in (18,20)`     |     查询在指定集合内不满足条件的记录     |
|   `select * from students where age between 10 and 20`   |                 区域查询                 |
| `select * from students where age not between 10 and 20` |                反区域查询                |
|        `select * from students where age is null`        |                 空值查询                 |
|      `select * from students where age is not null`      |                反空值查询                |
|           `select distinct name from students`           |       某属性下所有不重复关键字查询       |
|      `select *  from students where name like "t%"`      |              某属性 t 开头               |
|      `select *  from students where name like "%c"`      |              某属性 c 结尾               |
|     `select *  from students where name like "t%c"`      |           某属性 t 开头,c 结尾           |
|     `select *  from students where name like "%g%"`      |                  包含 g                  |
|   `select *  from students where name not like "%g%"`    |                 不包含 g                 |
|  `select *  from students where gender="男" and age>10`  |                多条件查询                |
|  `select *  from students where gender="男" or age>10`   |               满足一个条件               |
|                                                          |                                          |
|             查询语句+`order by  键名1,键名2`             |            可根据键名进行排序            |
|          查询语句+`order by  键名1,键名2 DESC`           |           可根据键名进行反排序           |
|        查询语句+`order by  键名1 ASC,键名2 DESC`         |               根据选择排序               |



* 约束`ALTER TABLE students_course ADD CONSTRAINT s_sid_c_sid FOREIGN KEY (sid) REFERENCES students (sid)`