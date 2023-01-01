/**
 * 列表 /list
 * 增加/add
 * 删除/delete
 * 更新/update
 */
const express = require('express')
const { async } = require('../db/server')

const router = express.Router()
    // 数据库
const db = require('../db/server')
    // uuid
const uuid = require('../utils/uuid')
    // 路由跳转
    // 查找接口
router.get('/list', async(req, res) => {

        let list_sql = 'select * from category'

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
    // 增加接口
router.post('/_token/add', async(req, res) => {
        let { name } = req.body
        const timer = Date.now()
        let add_sql = 'insert into category(id,name) values(?,?)'
        let { err, result } = await db.async.query(add_sql, [timer, name])

        if (err == null) {
            res.send({
                code: '200',
                msg: '添加成功'
            })
        } else {
            res.send({
                code: '500',
                msg: '添加失败'
            })
        }
    })
    //修改
router.put('/_token/update', async(req, res) => {
        let { id, name } = req.body
        let update_sql = 'update category set  name = ? where id =?'
        let { err, result } = await db.async.query(update_sql, [name, id])
        if (err == null) {
            res.send({
                code: '200',
                msg: '修改成功'
            })
        } else {
            res.send({
                code: '500',
                msg: '修改失败'
            })
        }
    })
    //删除
router.delete('/_token/delete', async(req, res) => {
    let id = req.query.id
    let delete_sql = 'delete from  category where id = ?'
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
module.exports = router