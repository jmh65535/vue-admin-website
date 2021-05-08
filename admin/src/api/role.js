import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/role/getRoles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role/createRole',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/role/updateRoleById',
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/deleteById',
    method: 'delete',
    data: { id }
  })
}
