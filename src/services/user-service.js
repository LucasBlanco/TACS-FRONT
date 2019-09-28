import { post, get } from 'axios'
import serverRoute from './server-route'
import { User } from '../models/usuario'
import auth from './auth'

export const createUser = ({ username, password }) => {
    return post(serverRoute + "/users", {
        username,
        password
    })
}

export const getUsers = () => {
    const headers = { Authorization: auth.token }
    return get(serverRoute + "/users", { headers: headers })
        .then(response => response.data.map(user => new User(user)))
}

export const compare = (idUser1, idUser2) => {
    const headers = { Authorization: auth.token }
    return get(serverRoute + `/comparison/favourites?id1=${idUser1}&id2=${idUser2}`, { headers: headers })
        .then(response => {
            console.log('Respueta', response.data)
            return response.data
        })
        .then(data => ({
            repositories: data.commonRepositories,
            languages: data.commonLanguages
        }))
}