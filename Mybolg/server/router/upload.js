/**
 * 文件上传接口
 * 使用富文本编辑器 wangEdutor
 */
const express = require('express')

const router = express.Router()

const fs = require('fs')

const path = require('path')
    //上传图片的模板
const multer = require('multer')

//upload_deitor文件上传接口
router.post('/upload_deitor', async(req, res) => {
    //没有上传文件
    // if (!req.files) {
    //     res.send({
    //         "errno": 1, // 只要不等于 0 就行
    //         "message": "失败信息"
    //     })
    //     return
    // }
    // 生成的图片放入temp文件夹下
    // let files = req.files
    // let ret_files = []
    // for (let file of files) {
    //     //获取文件名后缀
    //     let file_ext = file.originalname.substring(file.originalname.lastIndexOf('.') + 1)
    //         // 随机文件名字
    //     let file_name = uuid + '.' + file_ext
    //     fs.renameSync(
    //         process.cwd() + '/public/upload/temp/' + file.filename,
    //         process.cwd + '/public/uplocd/' + file_name
    //     )
    //     ret_files.push('/uplocd' + file_name)
    //     res.send({
    //         "errno": 0, // 注意：值是数字，不能是字符串
    //         "data": {
    //             "url": ret_files[0], // 图片 src ，必须
    //             "alt": "这是一张图片", // 图片描述文字，非必须
    //             // "href": "zzz" // 图片的链接，非必须
    //         }
    //     })
    // }
    // let upload = multer({ dest: '../public/upload/temp/' })

    fs.readFile(req.files[0].path, (err, data) => {
        if (err) return res.send({
                errno: 1, // 只要不等于 0 就行
                message: "失败信息"
            })
            //如果读取成功 使用时间戳和随机数拼接成图片名，尽量确保唯一性
        let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222)
            //扩展名
        let extname = req.file.mimetype.split('/')[1]
            // 拼接成图片名
        let keepname = time + '.' + extname
        fs.writeFile(path.join(__dirname, '../public/upload/temp/' + keepname), data, err => {
            if (err) return res.send({
                "errno": 1, // 只要不等于 0 就行
                "message": "失败信息"
            })
            res.send({
                "errno": 0, // 注意：值是数字，不能是字符串
                "data": {
                    "url": keepname, // 图片 src ，必须

                }
            })
        })
    })
    res.send('upload img')
})
module.exports = router