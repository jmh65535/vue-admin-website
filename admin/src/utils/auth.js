import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token-Novel'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(11)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
