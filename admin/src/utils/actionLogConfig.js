/* dispatch('actionLog/createLog', {
    adminId: data.id,
    module: actionLogConfig['login'].module,
    action: actionLogConfig['login'].action,
    content: actionLogConfig['login'].content
  }, { root: true })
  this.$store.dispatch('actionLog/createLog', {
    adminId: this.$store.getters.id,
    module: actionLogConfig['role'][2].module,
    action: actionLogConfig['role'][2].action,
    content: actionLogConfig['role'][2].content
    })

  */

module.exports = {
  login: [{
    module: '后台',
    action: '登录',
    content: '您登录了后台'
  }],
  logout: [{
    module: '后台',
    action: '退出登录',
    content: '您退出登录了'
  }],
  account: [{
    module: '个人中心',
    action: '账户编辑',
    content: '您完成了账户编辑'
  }, {
    module: '个人中心',
    action: '更换头像',
    content: '您完成了头像更换'
  }],
  user: [{
    module: '用户管理',
    action: '添加',
    content: '您完成了用户添加'
  }, {
    module: '用户管理',
    action: '修改密码',
    content: '您完成了密码修改'
  },
  {
    module: '用户管理',
    action: '编辑',
    content: '您完成了用户编辑'
  },
  {
    module: '用户管理',
    action: '删除',
    content: '您完成了用户删除'
  }],
  role: [{
    module: '角色管理',
    action: '添加',
    content: '您完成了角色添加'
  },
  {
    module: '角色管理',
    action: '编辑',
    content: '您完成了角色编辑'
  },
  {
    module: '角色管理',
    action: '删除',
    content: '您完成了角色删除'
  }]
}
