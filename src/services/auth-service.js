
import axios from 'axios'
import serverRoute from './server-route'

const login = ({ username, password }) => {
    return new Promise(resolve => {
        resolve({ username, password })
    })
    /*return axios.post(serverRoute + "/login", {
        username,
        password
    })*/
}

const logout = () => {
    return axios.delete(serverRoute + "/logout")
}

export default { login, logout }