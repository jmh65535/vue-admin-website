// 导入模型
const { logger } = require('../midwares/logger')
const Role = require('../models/role')


module.exports = {
    // 所有角色数据
    async getRoles(ctx, next) {
        try {
            let data = await Role.findAll()
            ctx.body = { msg: 'success', data }
        } catch (err) {
            ctx.body = { code: -1, msg: 'fail', }
        }
        await next();
    },

    // 添加角色
    async createRole(ctx, next) {
        let reqData = ctx.reqData || null
        if (!reqData.name) {
            ctx.body = { code: -1, msg: 'errArg' }
            return await next();
        }
        try {
            let data = await Role.createRole(reqData)
            ctx.body = { msg: 'add', data }
        } catch (err) {
            ctx.body = { code: -1, msg: 'fail' }
        }
        await next();
    },

    async updateRoleById(ctx, next) {
    
        let reqData = ctx.reqData || null
        if (reqData.id) {
            try {
                await Role.updateRoleById(reqData)
                ctx.body = { msg: 'update' }
            } catch (err) {
                ctx.body = { code: -1, msg: 'fail' }
            }
        } else {
            ctx.body = { code: -1, msg: 'errArg' }
        }
        await next();
    },

    async deleteById(ctx, next) {
        let reqData = ctx.reqData // 获取get请求参数
        if (reqData && reqData.id) {
            try {
                await Role.deleteById(reqData.id)
                ctx.body = { msg: 'del' }
            } catch (err) {
                ctx.body = { code: -1, msg: 'fail' }
            }
        } else {
            ctx.body = { code: -1, msg: 'errArg' }
        }
        await next();
    },

}