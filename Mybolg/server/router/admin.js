const express = require('express')

const router = express.Router()
    // 数据库
const db = require('../db/server')
    // uuid
const uuid = require('../utils/uuid')

router.post('/login', async(req, res) => {
    // 获取客户端传输的用户名 密码
    let { adminName, password } = req.body
        //查找数据库中的token
        // let sql = `select * from admin where adminName = ? and password = ? ;`
    let { err, result } = await db.async.query(`select * from admin where adminName = ? ;`, [adminName])
        // db.async.query('select * from admin where password = ?', [password]).then((result) => {
        //     console.log(result)
        // })
        // console.log({ err, result })
    if (err == null && result.length > 0) {
        //生成token
        let login_token = uuid;
        // 查询token 和 id
        let update_token_sql = 'update admin set token = ? where id = ?'
        await db.async.query(update_token_sql, [login_token, result[0].id])
        let admin_info = result[0]
        admin_info.token = login_token
        admin_info.password = ''
            // 登录成功
        res.send({
            code: 200,
            msg: '登录成功',
            data: admin_info
        })
    } else {
        res.send({
            code: 500,
            msg: '登录失败'
        })
    }

})
module.exports = router