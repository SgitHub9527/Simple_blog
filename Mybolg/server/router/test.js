const express = require('express')

const home = express.Router()
    // 数据库
const db = require('../db/server')
    // uuid
const uuid = require('../utils/uuid')
    // 路由跳转
home.get('/test', async(req, res) => {
    // const { acc, pwd } = req.body()
    var sql = 'select * from admin where id = 1 '

    let out = await db.async.query(sql, [])
        // db.query(sql, (err, result) => {
        //     console.log(result)
        // })

    // db.async.query(sql, []).then((res) => {
    //         console.log(res)
    //     })
    // res.write(db)
    let enct = {
        id: `${uuid}`,
        out
    }

    res.send(enct)
        // 关闭数据库
        // db.end()
})
module.exports = home