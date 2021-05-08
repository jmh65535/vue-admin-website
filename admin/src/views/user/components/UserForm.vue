<template>
  <div class="user-create-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" style="width: 200px" :disabled="!!propData" />
      </el-form-item>

      <el-form-item label="密 码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" style="width: 200px" show-password />
      </el-form-item>

      <el-form-item label="激 活" prop="active">
        <el-switch v-model="form.active" />
      </el-form-item>

      <el-form-item label="角 色" prop="roles">
        <el-select v-model="form.roles" placeholder="请选择角色">
          <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>

      <el-form-item label="介 绍" prop="introduction">
        <el-input v-model="form.introduction" type="textarea" rows="4" placeholder="请输入介绍" style="width: 500px" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createUser, updateUser } from '@/api/user'
import { getRoles } from '@/api/role'
import actionLogConfig from '@/utils/actionLogConfig'

const formData = {
  username: '',
  password: '',
  introduction: '',
  active: true
}
export default {
  name: 'UserForm',
  props: {
    propData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: formData,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请选择角色', trigger: 'select' }
        ]

      },
      selectOptions: []
    }
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      this.propData && (this.form = this.propData) && (this.form.password = '')
      this.getRoles()
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.propData) { // create
            this.postUser({
              type: 'createUser',
              msg: '添加成功'
            })
          } else { // update
            this.postUser({
              type: 'updateUser',
              msg: '编辑成功'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.form = {
        username: '',
        password: '',
        introduction: '',
        active: true
      }
      // this.$refs.form.resetFields();
    },
    postUser(opt) {
      if (opt.type === 'createUser') {
        createUser(this.form).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: opt.msg,
              type: 'success',
              onClose: () => {
                this.$store.dispatch('actionLog/createLog', {
                  adminId: this.$store.getters.id,
                  module: actionLogConfig['user'][0].module,
                  action: actionLogConfig['user'][0].action,
                  content: actionLogConfig['user'][0].content
                })
                this.$router.push({ path: '/user/index' })
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        updateUser(this.form).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: opt.msg,
              type: 'success',
              onClose: () => {
                this.$store.dispatch('actionLog/createLog', {
                  adminId: this.$store.getters.id,
                  module: actionLogConfig['user'][2].module,
                  action: actionLogConfig['user'][2].action,
                  content: actionLogConfig['user'][2].content
                })
                this.$router.push({ path: '/user/index' })
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    async getRoles() {
      const res = await getRoles()
      this.selectOptions = res.data
    }
  }
}
</script>

<style scoped>
.user-create-container {
  margin: 40px 30px;
}
</style>
