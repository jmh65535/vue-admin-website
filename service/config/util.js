const crypto = require('crypto');
const config = require('./index')
const fs = require('fs')
const path = require('path')
const { logger } = require('../midwares/logger')

module.exports = {
    mycrypto(info) {
        // 使用加盐算法加密
        let hmac = crypto.createHmac("sha1", config.key);
        return hmac.update(info).digest("Base64");
    },
    uploadAvatar(ctx) {
        const file = ctx.request.files.avatar;
        const fileName = ctx.reqData.filename
        // 创建可读流
        const render = fs.createReadStream(file.path);
        let namewithext = fileName +'_'+ new Date().getTime()+'.'+file.name.split('.').pop()
        let filePath = path.join(config.publicPath, 'upload/', namewithext);
        const fileDir = path.join(config.publicPath, 'upload');
        
        if (!fs.existsSync(fileDir)) {
            logger.debug('不存在')
            fs.mkdirSync(fileDir, err => {
            console.log(err)
            console.log('创建失败')
            });
        }
        // 创建写入流
        const upStream = fs.createWriteStream(filePath);
        render.pipe(upStream);
        logger.debug(ctx.request)
        return 'http://'+ ctx.request.header.host+ "/upload/"+ namewithext
    }
}