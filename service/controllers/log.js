// 导入模型
const { logger } = require('../midwares/logger')
const Admin = require('../models/admin')
const Log = require('../models/log')


module.exports = {

    async createLog(ctx, next) {
       
        let reqData = ctx.reqData || null
        try {
            reqData.admin_id = reqData.adminId
            delete reqData.adminId
            let data = await Log.createLog(reqData)
            ctx.body = { msg: 'add', data }
        } catch (err) {
            ctx.body = { code: -1, msg: 'fail' }
        }
        await next();
    },
    async getLogs(ctx, next) {
        try {
            let adminId = ctx.reqData && ctx.reqData.userId
            let data = await Log.getLogs(adminId)
            ctx.body = { msg: 'success', data }
        } catch (err) {
            ctx.body = { code: -1, msg: 'fail', }
        }
        await next();
    },

}