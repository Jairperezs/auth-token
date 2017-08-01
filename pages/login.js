import React, {Component} from 'react'
import AuthService from '../utils/AuthService'

const auth = new AuthService('http://ps3-api.herokuapp.com')

class Login extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount () {
        if(auth.loggedIn()) {
            this.props.url.replace('/admin')
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        auth.login(this.refs.username.value, this.refs.password.value)
            .then(res => {
                console.log(res)
                this.props.url.replace('/admin')
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <div>
                Login 
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref="username" />
                    <input type="text" ref="password" />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Login