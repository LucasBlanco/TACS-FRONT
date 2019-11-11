import { get } from 'axios';
import { post } from 'axios';
import { Contributor } from '../models/contributor';
import { Tag } from '../models/tag';
import { Commit } from '../models/commit';
import { GitIgnoreTemplate } from '../models/gitIgnoreTemplate';
import { Repository } from '../models/repository';
import auth from './auth';
import serverRoute from './server-route';

export const getRepositories = ({repositoryFilter, nextPage}) => {
    let queryFilter = repositoryFilter.getQueryFilter()
    queryFilter = nextPage ? queryFilter + "&page=" + nextPage : queryFilter
    const headers = {Authorization: auth.token}
    return get(serverRoute + `/repositories/search?${queryFilter}`, {headers: headers})
        .then(response => {
            return response.data
        }).then(data => {
            return {
                totalRepositories: data.totalRepositories,
                repositories: data.repositories.map(repo => new Repository(repo))
            }
        })
}


export const getGitIgnoreTemplates = () => {
    const headers = {Authorization: auth.token}
    return get(serverRoute + '/gitIgnoreTemplates', {'headers': headers})
        .then(response => {
            console.log('git ignore templates', response.data)
            return response.data.templates
        })
        .then(templates => templates.map(temp => new GitIgnoreTemplate(temp.name, temp.downloadUrl)))
}

export const getContributors = (repository) => {
    const headers = {Authorization: auth.token}
    return get(serverRoute + `/contributors?owner=${repository.owner}&reponame=${repository.name}`, {headers: headers})
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
export const getCommits = (repository) => {
    const headers = { Authorization: auth.token }
    return get(serverRoute + `/commits?owner=${repository.owner}&reponame=${repository.name}`, { headers: headers })
        .then(response => {
            return response.data.commits.map(commit => new Commit(commit))
        })
}

export const createRepository = (repo) => {
    const headers = { Authorization: auth.token }
    console.log(serverRoute + "/repositories/")
    console.log(repo)
    return post(serverRoute + "/repositories/", repo, { headers: headers })
}
