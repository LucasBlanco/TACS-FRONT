export class User {

    constructor(
        {
            id,
            username,
            admin,
            lastLoginDate,
            nofFavourites,
            languages
        }
    ) {
        this.id = id
        this.username = username
        this.admin = admin
        this.lastLoginDate = lastLoginDate
        this.nofFavourites = nofFavourites
        this.languages = languages
    }

}
