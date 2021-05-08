import request from '@/utils/request'

export function createLog(data) {
  return request({
    url: '/log/createLog',
    method: 'post',
    data
  })
}

export function getLogs(userId) {
  return request({
    url: '/log/getLogs',
    method: 'get',
    params: {
      userId
    }
  })
}
