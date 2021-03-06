import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd'

class UserForm extends Component {



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values)
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form
        const userRules = this.props.userRules || []
        const rules = {
            username: { required: true, message: 'Please input your username!' },
            password: { required: true, message: 'Please input your Password!' },
            passwordLength: { min: 4, message: 'The password must have more than 3 characters!' }
        }

        const decorators = {
            username: getFieldDecorator('username', { rules: [rules.username, ...userRules] }),
            password: getFieldDecorator('password', { rules: [rules.password, rules.passwordLength] })
        }

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {
                        decorators.username(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        decorators.password(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )
                    }

                </Form.Item>
                <Form.Item>
                    {this.props.children}
                </Form.Item>
            </Form>
        )
    }

}

const WrappedUserForm = Form.create({ name: 'userForm' })(UserForm);


export default WrappedUserForm;