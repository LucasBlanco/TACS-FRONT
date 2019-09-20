import React, { Component } from 'react';
import { Button, Col, Row } from 'antd';
import UserForm from '../user-form/user-form'

class CreateUser extends Component {
    state = {
    }

    handleSubmit = () => {
        this.props.history.push("/")
    }
    render() {
        return (

            <Row type="flex" align="middle" justify="center" style={{ height: '100vh', background: 'linear-gradient(29deg, rgba(22,111,148,1) 12%, rgba(9,94,121,1) 40%, rgba(0,212,255,1) 100%)' }}>
                <Col md={12} xl={8} style={{ border: '1px solid white', padding: '1rem', backgroundColor: 'white', borderRadius: 5 }}>
                    <UserForm handleSubmit={this.handleSubmit}>
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