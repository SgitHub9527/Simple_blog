/**
 * 博客的增删改查
 * /add method put
 * /delete method delete
 * /update method post 
 * /search method put 
 */
const express = require('express')

const router = express.Router()
    // 数据库
const db = require('../db/server')
    // uuid
const uuid = require('../utils/uuid')
    // 路由跳转
    //添加博客 
router.post('/_token/add', async(req, res) => {
        //获取客户端传过来的数据
        let { title, categoryId, content } = req.body
            //获取当前时间的时间戳
        let createTime = new Date().getTime()
        let id = Date.now() + 88
        let add_sqls = 'insert into myblog(id,title,categoryId,content,createTime) values(?,?,?,?,?)'
        let params = [id, title, categoryId, content, createTime]
        let { err, result } = await db.async.query(add_sqls, params)
        if (err == null) {
            res.send({
                code: 200,
                msg: '添加成功'
            })
        } else {
            res.send({
                code: 500,
                msg: '添加失败',
                data: err
            })
        }
    })
    // 删除
    //#region 
    // router.delete('/_token/delete', async(req, res) => {
    //         let id = req.query.id
    //         let delete_sql = 'delete from  myblog where id = ?'
    //         let { err, result } = await db.async.query(delete_sql, [id])
    //         if (err == null) {
    //             res.send({
    //                 code: '200',
    //                 msg: '删除成功'
    //             })
    //         } else {
    //             res.send({
    //                 code: '500',
    //                 msg: '删除失败'
    //             })
    //         }
    //     })
router.delete('/_token/delete', async(req, res) => {
        let id = req.query.id
        let delete_sql = 'delete from myblog  where id = ?'
        let { err, result } = await db.async.query(delete_sql, [id])
        result = null
        if (err == null) {
            res.send({
                code: '200',
                msg: '删除成功'
            })
        } else {
            res.send({
                code: '500',
                msg: '删除失败'
            })
        }
    })
    //修改
router.put('/_token/update', async(req, res) => {
        // 获取客户端传递的数据
        let { id, categoryId, title, content } = req.body
            // update_sql
        let update_sql = 'update myblog set categoryId = ? , title = ? , content = ? where id = ?'
        let params = [categoryId, title, content, id]
        let { err, result } = await db.async.query(update_sql, params)
        if (err == null) {
            res.send({
                code: 200,
                msg: '修改成功'
            })
        } else {
            res.send({
                code: 500,
                msg: '修改失败'
            })
        }
    })
    //查找
router.get('/list', async(req, res) => {

    let list_sql = 'select * from myblog'

    let { err, result } = await db.async.query(list_sql, [])
    if (err == null) {
        res.send({
            code: '200',
            msg: '查找成功',
            result: result
        })
    } else {
        res.send({
            code: '500',
            msg: '查找失败'
        })
    }
    // 关闭数据库
    // db.end()
})
module.exports = router