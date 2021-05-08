const { sequelize, Sequelize } = require('../config/db')
const { DataTypes, Model } = Sequelize
const { logger } = require('../midwares/logger')

class Admin extends Model {

    static async login(data){
        return this.getAdminByData(data)
    }
    
    /**
     * @description: 查询某个管理员数据
     * @param {object} data  {id:xx}   or  {username: xx, password: xx}
     * @return {object} Admin  一条符合条件的admin数据
     */    
    static async getAdminByData(data){
        // return (await this.findOne({where: data})).dataValues
        return await this.findOne({where: data})
    }

    /**
     * @description: 添加管理员
     * @param {object} User
     * @return {*} 返回添加的数据
     */
    static async createAdmin(User) {
        return await this.create(User)
    }

    /**
     * @description: 根据id修改管理员密码
     * @param {*} id
     * @return {*}  返回修改的数据
     */    
    static async updatepwdById({id, password}) {
        return await this.update({ password }, {
            where: {
                id
            }
        })
    }

    /**
     * @description: 更新管理员信息
     * @param {object} User
     * @return {*} 返回修改的数据
     */    
    static async updateAdminById(User) {
        return await this.update( User, {
            where: {
                id: User.id
            }
        })
    }

    /**
     * @description: 根据id删除管理员
     * @param {*} id
     * @return {*} 
     */    
    static async deleteById(id){
        return await this.destroy({
            where: {
                id
            }
        })
    }

}
// 初始化表结构
Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        username: {
            type: DataTypes.STRING,
            field: "username",
            allowNull: false,
            unique: true   // 唯一约束 用户名不能重复
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roles: {
            type: DataTypes.STRING,
            field: "roles",
            allowNull: false,
            defaultValue: 'editor'
        },
        avatar: {
            type: DataTypes.STRING,
            field: "avatar",
            allowNull: false,
            defaultValue: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        },
        introduction: {
            type: DataTypes.STRING,
            field: "intro",
            allowNull: false,
            defaultValue: '我的介绍'
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
    underscored: true, //额外字段以下划线来分割
    timestamps: true, //取消默认生成的createdAt、updatedAt字段
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true, // Model 对应的表名将与model名相同
    comment: "管理员表类",
    // paranoid: true      //虚拟删除
    sequelize, // 我们需要传递连接实例
    // modelName: 'Admin', // 我们需要选择模型名称
    // tableName: 'Admin'  // 表名
}
)

    // 创建表格
    ; (async () => {
        await Admin.sync().then(function(model){
            // 同步了'User'一个模型
            console.log(model.name + '模型已同步');
        })
        
       
        // 这里是代码
    })()
// 定义的模型是类本身
// console.log(User === sequelize.models.User); // true
module.exports = Admin
