export class Repository {

    constructor(
        {
            id,
            name,
            registrationDate,
            stars,
            owner,
            favs,
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
        this.language = language
        this.issues = issues
        this.source = source
        this.forks = forks
        this.size = size
    }

}
