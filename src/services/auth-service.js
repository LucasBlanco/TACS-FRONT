
import axios from 'axios'
import serverRoute from './server-route'
import auth from './auth'

const login = ({ username, password }) => {
    /*return new Promise(resolve => {
        resolve({ username, password })
    })*/
    return axios.post(serverRoute + "/login", {
        username,
        password
    }).then(response => response.data)
}

const logout = () => {
    return axios.post(serverRoute + "/logout", { token: auth.token })
}

export default { login, logout }