export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://ps3-api.herokuapp.com'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
    }

    login(username, password) {
        //get token
        return this.fetch(`${this.domain}/api/signin`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            this.setToken(res.token)
        })
    }

    loggedIn() {
        // Checks if there is saved token and it is still valid
        const token = this.getToken()
        return !!token && !isTokenExpired(token)
    }
    setToken(token) {
        // Save user token to localStorage
        localStorage.setItem('token', token)
    }

    getToken() {
        // Retrieves the user token from localStorage
        localStorage.getItem('token')
    }
    
    logout() {
        // Clear user token from localStorage
        localStorage.removeItem('token')
    }

    _checkStatus(response) {
        if(response.status >= 200 && response.status < 300) {
            return response
        } else {
            const error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if(this.loggedIn()){
            headers['Authorization'] = 'Bearer' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
    }
}