const Sequelize = require('sequelize');
const db = require('./index').db

// 初始化数据库
const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: 'mysql',
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00' // 慢几小时就加几小时，快则减
})

//测试数据库链接
sequelize.authenticate().then(function() {
    console.log("数据库连接成功");
}).catch(function(err) {
    //数据库连接失败时打印输出
    console.error(err);
    throw err;
});             

module.exports = { sequelize, Sequelize }