class Auth {

    constructor() {
        this.autenticated = false
    }

    login(userId, token, callback) {
        this.autenticated = true
        this.userId = userId
        this.token = token
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