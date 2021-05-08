const { sequelize, Sequelize } = require('../config/db')
const { DataTypes, Model } = Sequelize
const { logger } = require('../midwares/logger')

class Log extends Model {

    /**
     * @description: 添加一条日志信息
     * @param {*} data
     * @return {*}
     */    
    static async createLog(data) {
        return await this.create(data)
    }

    static async getLogs(id) {
        return await this.findAll({
            where: {
                admin_id: id
            },
            order: [['id', 'DESC']]
        })
    }

}
// 初始化表结构
// id admin_id module action create_at  
Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        module: {
            type: DataTypes.STRING,
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        }
    }, {
    underscored: true, //额外字段以下划线来分割
    timestamps: true, //取消默认生成的createdAt、updatedAt字段
    createdAt: "created_at",
    updatedAt: false,
    freezeTableName: true, // Model 对应的表名将与model名相同
    comment: "操作记录表类",
    // paranoid: true      //虚拟删除
    sequelize, // 我们需要传递连接实例
    // modelName: 'Admin', // 我们需要选择模型名称
    // tableName: 'Admin'  // 表名
}
)

    // 创建表格
    ; (async () => {
        await Log.sync().then(function(model){
            // 同步了'User'一个模型
            console.log(model.name + '模型已同步');
        })
        
       
        // 这里是代码
    })()
// 定义的模型是类本身
// console.log(User === sequelize.models.User); // true
module.exports = Log
