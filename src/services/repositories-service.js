import { post, get } from 'axios'
import serverRoute from './server-route'
import auth from './auth'
import { Repository } from '../models/repository';


export const getRepositories = ({ repositoryFilter, nextPage }) => {
    let queryFilter = repositoryFilter.getQueryFilter()
    queryFilter = nextPage ? queryFilter + "&lastId=" + nextPage : queryFilter
    const headers = { Authorization: auth.token }
    return get(serverRoute + `/repositories/search?${queryFilter}`, { headers: headers })
        .then(response => {
            console.log('Respueta', response.data)
            return response.data
        }).then(data => {
            return {
                nextPage: data.nextPageId,
                repositories: data.repositories.map(repo => new Repository(repo))
            }
        })
}