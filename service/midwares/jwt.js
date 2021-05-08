// /server/middlreware/tokenError.js
const jwt = require('jsonwebtoken');
const config = require('../config');
const util = require('util');
const { logger } = require('./logger');
const verify = util.promisify(jwt.verify);

/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        console.log('==========jwt=======');
        console.log('===========jwtend======');
        try {
            // 获取jwt
            const token = ctx.header.authorization;
            if (token) {
                try {
                    // 解密payload，获取用户名和ID
                    let payload = await verify(token.split(' ')[1], config.jwtSecret);
                    ctx.user = {
                        username: payload.username,
                        id: payload.id
                    };
                } catch (err) {
                    console.log('token verify fail: ', err)
                }
            }
            await next();
        } catch (err) {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    code: -1,
                    msg: 'fail'
                };
            } else {
                err.status = 404;
                ctx.body = {
                    code: -1,
                    msg: '404'
                };
            }
            await next()
        }
    }
}