
import axios from 'axios'
import serverRoute from './server-route'
import auth from './auth'
import { Repository } from '../models/repository'

export const getFavorites = () => {
    const headers = { Authorization: auth.token }
    return axios.get(serverRoute + "/users/" + auth.userId + '/favourites', { headers: headers })
        .then(response => response.data.map(
            favorite => new Repository(favorite)
        ))
}

export const deleteFavourite = (id) => {
    const headers = { Authorization: auth.token }
    return axios.delete(serverRoute + "/users/" + auth.userId + '/favourites/' + id, { headers: headers })
        .then(response => response.data)
}