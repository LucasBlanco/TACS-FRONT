
import axios from 'axios'
import serverRoute from './server-route'
import auth from './auth'
import { Repository } from '../models/repository'

export const getFavorites = () => {
    return axios.get(serverRoute + "/users/" + auth.userId + '/favourites')
        .then(response => response.data.map(
            favorite => new Repository(favorite)
        ))
}

export const deleteFavourite = (id) => {
    return axios.delete(serverRoute + "/users/" + auth.userId + '/favourites/' + id)
        .then(response => response.data)
}