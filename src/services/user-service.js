
import { post } from 'axios'
import serverRoute from './server-route'

export const createUser = ({ username, password }) => {
    return post(serverRoute + "/users", {
        username,
        password
    })
}