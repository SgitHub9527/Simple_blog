/**
 * 后台准备 
 * express :node 框架
 * multer :上传文件所用插件
 * mysql  数据库
 * uuid  生成唯一id
 * 
 */
// 引入express
const express = require('express')
    // import { express } from 'express'
    // 实例化服务器
const app = express()
    // 允许上传npm install express -g   // -g是全局安装的意思

const multer = require('multer')

const bodyParser = require('body-parser')
    // 路径模块
const path = require('path')

const db = require('./db/server')
    // 端口号
const port = 8080

// 跨域解决
app.use((req, res, next) => {
        //设置允许跨域的域名，*代表任意域名跨域
        res.header('Access-Control-Allow-Origin', '*')
            //允许的header类型
        res.header('Access-Control-Allow-Headers', "*")
            //允许跨域的请求类型
        res.header('Access-Control-Allow-Methods', 'DELETE,POST,GET,PUT,OPTIONS')
        res.header("Content-Type", "application/json;charset=utf-8")
        if (req.method == 'OPTIONS') res.sendStatus(200) //让options尝试请求快速结束
        else next()
    })
    // 使服务器能够解析json格式的数据(所有中间件之前)
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))
    // 允许上传
const update = multer({
    //上传位置
    dest: './public/upload/temp'
})

//注册为全局可上传
app.use(update.any())

// 登录权限校验中间件
const ADMIN_TOKEN_PATH = '/_token'
    //app.all()不区别请求方法
app.all('*', async(req, res, next) => {
    //需要权限验证
    if (req.path.indexOf(ADMIN_TOKEN_PATH) > -1) {
        //请求头中获取token
        const { token } = req.headers
            //查询数据库中的token
        const sql = 'select * from admin where token = ?'
        const params = [token]
        const adminToken = await db.async.query(sql, params)
        if (adminToken.err != null || adminToken.result.length == 0) {
            res.send({
                code: 403,
                msg: '请先登录'
            })
            return
        } else {
            next()
        }
    } else {
        next()
    }
})



app.use('/home', require('./router/test'))
app.use('/admin', require('./router/admin'))
app.use('/category', require('./router/category'))
app.use('/blog', require('./router/blog'))
app.use('/upload', require('./router/upload'))







// 服务器get请求
app.get('/', (req, res) => res.send('i am ok ! '))
app.listen(port, () => console.log(`服务启动成功:http://localhost:${port}`))