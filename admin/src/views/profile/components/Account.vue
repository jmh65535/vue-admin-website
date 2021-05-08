<template>
  <div class="account-container">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item hidden>
        <el-input v-model.trim="user.id" />
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model.trim="user.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="user.password" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model.trim="user.introduction" type="textarea" rows="3" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model.trim="user.mobile" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model.trim="user.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import actionLogConfig from '@/utils/actionLogConfig'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: '',
          username: '',
          password: '',
          introdution: '',
          email: '',
          mobile: ''
        }
      }
    }
  },
  data() {
    return {
      form: this.user,
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateUser(this.user).then(res => {
            if (res.code === 20000) {
              // console.log('update');
              this.$message({
                message: '编辑成功',
                type: 'success',
                onClose: () => {
                  this.$store.dispatch('actionLog/createLog', {
                    adminId: this.user.id,
                    module: actionLogConfig['account'][0].module,
                    action: actionLogConfig['account'][0].action,
                    content: actionLogConfig['account'][0].content
                  })
                  this.$store.commit('user/SET_USER_INFO', this.user)
                  // this.$store.commit('user/SET_NAME', this.user.username)
                }
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

