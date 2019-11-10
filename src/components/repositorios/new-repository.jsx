import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import TextArea from "antd/lib/input/TextArea";
import { createRepository } from '../../services/repositories-service';

class NewRepository extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const hide = message.loading('Action in progress..', 0);
            if (!err) {
                createRepository(values)
                .then(() => {
                    hide()
                    message.success("The repository was created successfully")
                    this.props.form.resetFields();
                })
                .catch(error => {
                    hide()
                    message.error(error.response.data)
                })
    
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <h1>Create repository</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Name">
                        {getFieldDecorator("name", {
                            rules: [{ required: true, message: "Please input the name of the repository!" }]
                        })(
                            <Input
                                placeholder="Repository name"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Description">
                        {getFieldDecorator("description", {})(
                            <TextArea
                                placeholder="Description..."
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Form.Item style={{ display: 'inline-block' }}>
                            {getFieldDecorator("has_issues", {
                                valuePropName: "checked",
                                initialValue: true
                            })(<Checkbox>Has issues</Checkbox>)}
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block' }}  >
                            {getFieldDecorator("auto_init", {
                                valuePropName: "checked",
                                initialValue: true
                            })(<Checkbox>Auto init</Checkbox>)}
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}

const NewRepositoryForm = Form.create({ name: "new_repository" })(
    NewRepository
);

export default NewRepositoryForm;
