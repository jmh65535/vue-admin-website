<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab" @tab-click="handleClick">
              <el-tab-pane key="todolist" label="待办事项" name="todolist">
                <todolist />
              </el-tab-pane>
              <el-tab-pane :key="actionlogKey" label="操作记录" name="actionlog">
                <action-log />
              </el-tab-pane>
              <el-tab-pane key="account" label="账户编辑" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Todolist from './components/TodoList'
import ActionLog from './components/ActionLog'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Todolist, ActionLog, Account },
  data() {
    return {
      user: {},
      activeTab: 'todolist',
      actionlogKey: 'actionlog'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'introduction',
      'mobile',
      'email',
      'id'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        id: this.id,
        username: this.name,
        roles: this.roles,
        email: this.email,
        avatar: this.avatar,
        introduction: this.introduction,
        mobile: this.mobile
      }
    },
    handleClick(tab, event) {
      if (tab.name === 'actionlog') {
        this.actionlogKey = 'actionlog' + new Date().getTime()
        console.log('key change')
      }
    }
  }
}
</script>
