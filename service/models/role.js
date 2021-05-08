const { sequelize, Sequelize } = require('../config/db')
const { DataTypes, Model } = Sequelize
const { logger } = require('../midwares/logger')
class Role extends Model {


    static async getRoleByName(name) {
        return (await this.findOne({
            attributes: ['routes'],
            where: { name }
        })).dataValues
    }

    /**
     * @description: 添加角色
     * @param {object} Role
     * @return {*} 返回添加的数据
     */
    static async createRole(Role) {
        return await this.create(Role)
    }

    /**
     * @description: 更新角色信息
     * @param {object} Role
     * @return {*} 返回修改的数据
     */
    static async updateRoleById(Role) {
        return await this.update(Role, {
            where: {
                id: Role.id
            }
        })
    }

    /**
     * @description: 根据id删除角色
     * @param {string} id
     * @return {*} 
     */
    static async deleteById(id) {
        return await this.destroy({
            where: {
                id
            }
        })
    }

}
// 初始化表结构
Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true   // 唯一约束 用户名不能重复
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '描述'
        },
        routes: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        }
    }, {
    underscored: true, //额外字段以下划线来分割
    timestamps: true, //取消默认生成的createdAt、updatedAt字段
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true, // Model 对应的表名将与model名相同
    comment: "角色表类",
    // paranoid: true      //虚拟删除
    sequelize, // 我们需要传递连接实例
}
)

    // 创建表格
    ; (async () => {
        await Role.sync().then(function (model) {
            // 同步了'User'一个模型
            console.log(model.name + '模型已同步');
        })
    })()
module.exports = Role
