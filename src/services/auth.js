class Auth {

    constructor() {
        this.autenticated = false
        this.isAdmin = false
    }

    login(userId, token, admin, callback) {
        this.autenticated = true
        this.userId = userId
        this.token = token
        this.isAdmin = admin
        callback && callback()
    }


    logout(callback) {
        this.autenticated = false
        this.token = null
        callback && callback()
    }

    isAutenticated() {
        return this.autenticated
    }
}

export default new Auth()