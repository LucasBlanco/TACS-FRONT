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

export const compare = (idUser1, idUser2) => {
    return get(serverRoute + `/comparison/favourites?id1=${idUser1}&id2=${idUser2}`)
        .then(response => {
            console.log('Respueta', response.data)
            return response.data
        })
        .then(data => ({
            repositories: data.commonRepositories,
            languages: data.commonLanguages
        }))
}