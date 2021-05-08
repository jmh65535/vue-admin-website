// 导入模型
const { logger } = require('../midwares/logger')
const jwt = require('../config/jwt')
const Admin = require('../models/admin')
const Role = require('../models/role')
const Log = require('../models/log')
const { mycrypto, uploadAvatar } = require('../config/util')

module.exports = {

    async getAllAdmins(ctx, next) {
        try {
            let data = await Admin.findAll()
            ctx.body = { msg: 'success', data }
        } catch (err) {
            ctx.body = { code: -1, msg: 'fail', }
        }
        await next();
    },

    async getAdminInfo(ctx, next){
        
        let token = ctx.headers && ctx.headers.authorization
        if(token) {
            let payload = jwt.verify(token)
            let admin =  (await Admin.getAdminByData({id: payload.id})).dataValues
            
            // 获取asyncRoutes
            let asyncRoutes = (await Role.getRoleByName(admin.roles)).routes
            admin.routes = JSON.parse(asyncRoutes)
            admin.name = admin.username
            ctx.body = { msg: 'success', data: admin }
        }else{
            ctx.body = { code: -2, msg: 'tokenNeeded'}
        }
        await next()
    },

    async createAdmin(ctx, next) {
        let req = ctx.request.body
        if (!req.username || !req.password) {
            ctx.body = { code: -1, msg: 'errArg' }
            return await next();
        }
        try {
            // 密码加密
            req.password = mycrypto(req.password)
            let data = await Admin.createAdmin(req)
            ctx.body = { msg: 'add', data }
        } catch (err) {
           
            ctx.body = { code: -1, msg: 'fail' }
        }
        await next();
    },

    async updatepwdById(ctx, next) {
        let req = ctx.request.body
        if (req.id && req.password) {
            try {
                req.password = mycrypto(req.password)
                await Admin.updatepwdById(req)
                ctx.body = { msg: 'update' }
            } catch (err) {
                ctx.body = { code: -1, msg: 'fail' }
            }
        } else {
            ctx.body = { code: -1, msg: 'errArg' }
        }
        await next();
    },

    async updateAdminById(ctx, next) {
        let reqData = ctx.reqData || null
        if (reqData.id) {
            try {
                // logger.debug(reqData)
                if(reqData.password) {
                    reqData.password = mycrypto(reqData.password)
                }
                await Admin.updateAdminById(reqData)
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
        let query = ctx.request.query // 获取get请求参数
        if (query && query.id) {
            try {
                await Admin.deleteById(query.id)
                ctx.body = { msg: 'del' }
            } catch (err) {
                ctx.body = { code: -1, msg: 'fail' }
            }
        } else {
            ctx.body = { code: -1, msg: 'errArg' }
        }
        await next();
    },

    async login(ctx, next) {
    
        let reqData = ctx.reqData || null
        if(reqData.username && reqData.password){
            try{
                reqData.password = mycrypto(reqData.password)
                let data = (await Admin.login(reqData)).dataValues
                // 登陆成功 生成jwt
                const token = jwt.sign(data.id)
                ctx.body = { msg: 'log', data, token }
            }catch(err){
                ctx.body = { code: -1, msg: 'log_fail' }
            }
        }else{
            ctx.body = { code: -1, msg: 'errArg' }
        }
        await next(); 
    },
    async logout(ctx, next){ // 目前不需要操作
        ctx.body = { msg: 'success' }
        next()
    },
    async uploadAvatar(ctx, next) {
        let filepath = uploadAvatar(ctx)
        ctx.body = { msg: 'success', data: {filepath}}
        await next()
    }
}