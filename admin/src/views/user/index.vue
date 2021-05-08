<template>
  <div class="user-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="介绍">
        <template slot-scope="{ row }">
          <span>{{ row.introduction }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机">
        <template slot-scope="{ row }">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码" align="center">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.password" class="edit-input" size="small" @focus="row.password = ''" />
            <el-button class="cancel-btn" icon="el-icon-close" type="warning" @click="cancelEdit(row)" />
          </template>
          <span v-else>{{ row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色">
        <template slot-scope="{ row }">
          <span>{{ row.roles }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="激活" width="50">
        <template slot-scope="{ row }">
          <el-tag :type="row.active ? 'success' : 'danger'">
            {{ row.active | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="{ row }">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="190">
        <template slot-scope="{ row }">
          <el-button-group>
            <el-button v-if="row.edit" v-permission="['admin','editor']" type="success" icon="el-icon-check" @click="confirmEdit(row)" />
            <el-button v-else v-permission="['admin','editor']" type="primary" icon="el-icon-edit-outline" @click="row.edit = !row.edit" />

            <el-button v-permission="['admin','editor']" type="primary" icon="el-icon-edit" @click="updateUser(row)" />

            <el-button v-permission="['admin']" type="danger" icon="el-icon-delete" @click="deleteUser(row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import { getAllUsers, updatepwd, deleteUser } from '@/api/user'
import actionLogConfig from '@/utils/actionLogConfig'

export default {
  name: 'UserIndex',
  filters: {
    statusFilter(status) {
      const statusMap = ['否', '是']
      return status ? statusMap[1] : statusMap[0]
    }
  },
  directives: { permission },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  activated() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await getAllUsers(this.listQuery)
      this.list = data.map((v) => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalPassword = v.password //  will be used when user click the cancel botton
        v.password = '******'
        return v
      })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.password = '******'
      row.edit = false
      this.$message({
        message: '已取消',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      // console.log(row);
      if (row.password.length < 6) {
        this.$message({
          message: '密码不合法',
          type: 'warning'
        })
        return
      }
      row.edit = false
      updatepwd({ id: row.id, password: row.password })
        .then((res) => {
          if (res.code === 20000) {
            row.password = '******'
            this.$message({
              message: '已修改',
              type: 'success',
              onClose: () => {
                this.$store.dispatch('actionLog/createLog', {
                  adminId: this.$store.getters.id,
                  module: actionLogConfig['user'][1].module,
                  action: actionLogConfig['user'][1].action,
                  content: actionLogConfig['user'][1].content
                })
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteUser(row) {
      this.$confirm('确认要删除用户?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUser(row.id).then((res) => {
            if (res.code === 20000) {
              this.$message({
                message: '已删除',
                type: 'success',
                onClose: () => {
                  this.$store.dispatch('actionLog/createLog', {
                    adminId: this.$store.getters.id,
                    module: actionLogConfig['user'][3].module,
                    action: actionLogConfig['user'][3].action,
                    content: actionLogConfig['user'][3].content
                  })
                  this.list = this.list.filter(
                    (u) => u.id != row.id
                  )
                }
              })
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateUser(row) {
      this.$router.push({ path: '/user/update', query: { data: row }})
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 70px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.user-container {
  margin: 40px 30px;
}
</style>
