import axios from 'axios'
const loginUrl = 'https://apis.pansheng.com/m/enterprise/staff/login'

export default {
  login(user) {
    return axios.post(loginUrl, user)
  }
}