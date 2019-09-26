
import { get } from 'axios'
import serverRoute from './server-route'
import auth from './auth'
import { Repository } from '../models/repository'

export const getFavorites = () => {
    return get(serverRoute + "/users/" + auth.userId + '/favourites')
        .then(response => response.data.map(
            favorite => new Repository(favorite)
        ))
}
