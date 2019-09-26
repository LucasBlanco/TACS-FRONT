
import { post, get } from 'axios'
import serverRoute from './server-route'
import { User } from '../models/usuario'

export const createUser = ({ username, password }) => {
    return post(serverRoute + "/users", {
        username,
        password
    })
}

export const getUsers = () => {
    return get(serverRoute + "/users")
        .then(response => response.data.map(user => new User(user)))
}