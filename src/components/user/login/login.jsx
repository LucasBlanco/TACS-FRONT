import React, { Component } from 'react';
import { Button, Col, Row, message } from 'antd';
import auth from "../../../services/auth"
import UserForm from '../user-form/user-form';
import { Link } from 'react-router-dom'
import authService from '../../../services/auth-service'

class Login extends Component {
    state = {
    }

    handleSubmit = ({ username, password }) => {
        const hide = message.loading('Action in progress..', 0);
        authService.login({ username, password }).then((loginInfo) => {
            hide()
            const { userId, token, admin } = loginInfo
            auth.login(userId, token, admin, () => {
                this.props.history.push("/app")
            })
        }).catch(error => {
            hide()
            message.error(error.response.data);
        })
    }
    render() {
        return (
            <Row type="flex" align="middle" justify="center" style={{ height: '100vh', background: 'linear-gradient(29deg, rgba(22,111,148,1) 12%, rgba(9,94,121,1) 40%, rgba(0,212,255,1) 100%)' }}>
                <Col md={12} xl={8} style={{ border: '1px solid white', padding: '1rem', backgroundColor: 'white', borderRadius: 5 }}>
                    <UserForm handleSubmit={this.handleSubmit}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                        <Link to="/createUser">
                            OR <span style={{ color: 'blue' }}>Register</span>
                        </Link>
                    </UserForm>
                </Col>
            </Row>
        );
    }
}


export default Login;