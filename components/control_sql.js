const express = require("express")
const router = express.Router()
const pool = require("../mysqldb/pool")



router.get("/select", (req, res) => {
    pool(req.query.sentence).then((re) => {
        res.send({ code: 1, data: re })
    })
}).get("/update", (req, res) => {
    pool(req.query.sentence).then((re) => {
        pool("select * from students").then((re) => {
            res.send({ code: 1, data: re })
        })
    })
}).get("/delete", (req, res) => {
    console.log(req.query)
    pool(req.query.sentence).then((re) => {
        pool("select * from students").then((re) => {
            res.send({ code: 1, data: re })
        })
    })
}).post("/insert", (req, res) => {
    pool(req.query.sentence, req.body).then((re) => {
        pool("select * from students").then((re) => {
            res.send({ code: 1, data: re })
        })
    })
})



module.exports = router