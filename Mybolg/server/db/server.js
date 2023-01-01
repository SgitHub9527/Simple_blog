    // 引入数据库
    const mysql = require('mysql')

    //数据库配置
    const db = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123123',
            database: 'blog'
        })
        // 连接数据库
    db.connect(err => {
            if (err) {
                console.log('数据库连接失败' + err.message)
            } else
                console.log('数据库连接成功')
        })
        // 数据库操作
        // const sql = 'select * from admin where id = 1 '
        // db.query(sql, [], (err, result) => {
        //         if (err) throw err
        //        console.log(result)
        //     })

    // 封装数据库query操作
    db.async = {}
    db.async.query = (sql, params) => {
        return new Promise((resolve, reject) => {
            db.query(sql, params, (err, result) => {
                resolve({ err, result })
            })
        })
    }
    db.async.run = (sql, params) => {
            return new Promise((resolve, reject) => {
                db.query(sql, params, (err, result) => {
                    resolve({ err, result })
                })
            })
        }
        //关闭数据库(数据库暂时不关闭)
        // db.end()
        // 暴露数据库和雪花id
    module.exports = db