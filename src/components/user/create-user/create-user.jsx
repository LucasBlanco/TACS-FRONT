import React, { Component } from 'react';
import { Button, Col, Row, message } from 'antd';
import UserForm from '../user-form/user-form'
import { createUser } from '../../../services/user-service';

class CreateUser extends Component {
    state = {
    }


    handleSubmit = ({ username, password }) => {
        const hide = message.loading('Action in progress..', 0);
        createUser({ username, password })
            .then(() => {
                hide()
                message.success("El usuario fue creado con exito")
                this.props.history.push("/")
            })
            .catch(error => {
                hide()
                message.error(error.message)
            })

    }

    uniqueUsername = (rule, value, callback) => {
        if (value && value === 'Lucas') {
            callback('The username is already in use. Pick another one');
        } else {
            callback();
        }
    };


    render() {
        return (

            <Row type="flex" align="middle" justify="center" style={{ height: '100vh', background: 'linear-gradient(29deg, rgba(22,111,148,1) 12%, rgba(9,94,121,1) 40%, rgba(0,212,255,1) 100%)' }}>
                <Col md={12} xl={8} style={{ border: '1px solid white', padding: '1rem', backgroundColor: 'white', borderRadius: 5 }}>
                    <UserForm handleSubmit={this.handleSubmit} userRules={[this.uniqueUsername]}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Create
                        </Button>
                    </UserForm>
                </Col>
            </Row>
        );
    }
}


export default CreateUser;