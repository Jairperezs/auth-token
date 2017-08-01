import React, {Component} from 'react'
import withAuth from '../utils/withAuth'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const token = this.props.auth.getToken()
        return( 
            <div>Token: {token}</div>
        ) 
    }
}

export default withAuth(Dashboard)