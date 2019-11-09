import { get } from 'axios'
import serverRoute from './server-route'
import auth from './auth'
import { Repository } from '../models/repository';
import { Contributor } from '../models/contributor';
import { Tag } from '../models/tag';

export const getRepositories = ({ repositoryFilter, nextPage }) => {
    let queryFilter = repositoryFilter.getQueryFilter()
    queryFilter = nextPage ? queryFilter + "&page=" + nextPage : queryFilter
    const headers = { Authorization: auth.token }
    return get(serverRoute + `/repositories/search?${queryFilter}`, { headers: headers })
        .then(response => {
            return response.data
        }).then(data => {
            return {
                totalRepositories: data.totalRepositories,
                repositories: data.repositories.map(repo => new Repository(repo))
            }
        })
}

export const getContributors = (repository) => {
    const headers = { Authorization: auth.token }
    return get(serverRoute + `/contributors?owner=${repository.owner}&reponame=${repository.name}`, { headers: headers })
        .then(response => {
            return response.data.contribuors.map(contributor => new Contributor(contributor))
        })
}

export const getTags = (repository) => {
    const headers = { Authorization: auth.token }
    return get(serverRoute + `/tags?owner=${repository.owner}&reponame=${repository.name}`, { headers: headers })
        .then(response => {
            return response.data.tags.map(tag => new Tag(tag))
        })
}
