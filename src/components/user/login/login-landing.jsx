
import React, { Component } from 'react';

import { Route } from 'react-router-dom'
import Login from './login'
import CreateUser from '../create-user/create-user'

class LoginLanding extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" component={Login}></Route>
                <Route path="/createUser" component={CreateUser}></Route>
            </React.Fragment>
        );
    }
}

export default LoginLanding;