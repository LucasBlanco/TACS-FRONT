export class Repository {

    constructor(
        {
            id,
            name,
            registrationDate,
            stars,
            owner,
            favs,
            totalCommits,
            language,
            issues,
            source,
            forks,
            size
        }
    ) {
        this.id = id
        this.name = name
        this.registrationDate = registrationDate
        this.stars = stars
        this.owner = owner
        this.favs = favs
        this.totalCommits = totalCommits
        this.language = language
        this.issues = issues
        this.source = source
        this.forks = forks
        this.size = size
    }

}
