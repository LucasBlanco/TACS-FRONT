class Auth {

    constructor() {
        this.autenticated = false
    }

    login(callback) {
        this.autenticated = true
        callback && callback()
    }

    logout(callback) {
        this.autenticated = false
        callback && callback()
    }

    isAutenticated() {
        return this.autenticated
    }
}

export default new Auth()