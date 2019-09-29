
import axios from 'axios'
import serverRoute from './server-route'
import auth from './auth'
import { Repository } from '../models/repository'

export const getOwnFavorites = () => {
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

export const getAllFavourites = (start, limit, since, to) => {
    const headers = { Authorization: auth.token }
    var sinceParam = ""
    var toParam = ""
    if (since) {
        sinceParam = `&since=${since}`
    }
    if (to) {
        toParam = `&to=${to}`
    }

    return axios.get(serverRoute + `/favourites?start=${start}&limit=${limit}${sinceParam}${toParam}`, { headers: headers })
        .then(response => {
            return {
                totalAmount: response.data.totalAmount,
                repositories: response.data.repositories.map(user => new Repository(user))
            }
        })
}