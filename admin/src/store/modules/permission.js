import { asyncRoutes, constantRoutes } from '@/router'
import path from 'path'
/**
 * 根据数据库中获取的角色对应的路由 对比asyncRoutes 过滤权限路由
 * @param route asyncRoute from '@/router'
 * @param routes 登陆的账号的角色对应的route
 */
function hasPermission(routes, route, basePath) {
  if (route.meta) {
    return routes.some(r => {
      if (r.path === route.path) return true
      if (r.children) return r.children.some(childr => childr.path === path.resolve(basePath, route.path))
    })
  } else {
    return true
  }
}

/**
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
*/

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(asyncRoutes, routes, basePath = '/') {
  const res = []
  asyncRoutes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(routes, tmp, basePath)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, routes, tmp.path)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }

}

const actions = {
  generateRoutes({ commit }, { roles, routes }) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, routes)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
