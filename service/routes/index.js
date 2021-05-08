const { logger } = require('../midwares/logger')
const jwt = require('../config/jwt')

const router = require('koa-router')()

let modules = {
  admin: require('../controllers/admin'),
  role: require('../controllers/role'),
  log: require('../controllers/log'),
}

router.all('/api/:module/:action', async (ctx, next) => {
  
  let { module, action } = ctx.params
  let moduleAction = modules[module][action]
  if (moduleAction && typeof moduleAction === 'function') {
    switch(ctx.method){
      case 'POST':
        ctx.reqData = ctx.request.body || null
        break
      case 'GET':
        ctx.reqData = ctx.request.query || null
        break
      case 'PUT':
        ctx.reqData = ctx.request.body || null
      break
      case 'DELETE':
        ctx.reqData = ctx.request.body || null
      break
    }
    
    // jwt验证
    if (['login'].indexOf(action) >= 0) { //['login']数组内免验证
      await moduleAction(ctx, next)
    } else {
      const token = ctx.header.authorization
      if (token) {
        let payload = jwt.verify(token)
        if(payload.id){
          await moduleAction(ctx, next)
        }
        
      } else {
        // 没有token
        ctx.body = { code: -2, msg: 'tokenNeeded' } 
        await next()
      }
    }
  } else {
    
    ctx.response.status = 404
    ctx.body = { code: -1, msg: '404' }
  }

})


module.exports = router
