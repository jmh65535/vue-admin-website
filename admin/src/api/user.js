import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/getAdminInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function getAllUsers() {
  return request({
    url: '/admin/getAllAdmins',
    method: 'post'
  })
}

export function createUser(data) {
  return request({
    url: '/admin/createAdmin',
    method: 'post',
    data
  })
}

export function updatepwd(data) {
  return request({
    url: '/admin/updatepwdById',
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/admin/deleteById',
    method: 'get',
    params: { id }
  })
}

export function updateUser(data) {
  return request({
    url: '/admin/updateAdminById',
    method: 'post',
    data
  })
}
