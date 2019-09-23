import React, { Component } from 'react'
import { Row, Card, Typography, Col, Form, Input, Button, InputNumber } from 'antd';
import { RepositoriosTable } from './repositorios-table';

const { Title } = Typography

class Repositorios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repositorios: [
                {
                    key: '1',
                    name: 'Mike',
                    age: 32,
                    address: '10 Downing Street',
                },
                {
                    key: '2',
                    name: 'John',
                    age: 42,
                    address: '10 Downing Street',
                },
            ]
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Row>
                <Row style={{ paddingBottom: 20 }}>
                    <Card>
                        <Row>
                            <Title level={2}>Filtros</Title>
                        </Row>
                        <Row gutter={24} type="flex" justify="start">
                            <Form  {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Col lg={8}>
                                    <Form.Item label="Issues">
                                        <InputNumber
                                            placeholder="1"
                                            min="0"
                                        />

                                    </Form.Item>
                                </Col>
                                <Col lg={8}>
                                    <Form.Item label="Commits">
                                        <InputNumber
                                            placeholder="1"
                                            min="0"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col lg={8}>
                                    <Form.Item label="Language">
                                        <Input
                                            placeholder="Java"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col lg={8}>
                                    <Form.Item label="Score">
                                        <InputNumber
                                            placeholder="999"
                                            min="0"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col lg={8}>
                                    <Form.Item label="Subscribers">
                                        <InputNumber
                                            placeholder="1"
                                            min="0"
                                        />
                                    </Form.Item>
                                </Col>
                            </Form>
                        </Row>
                        <Row type="flex" justify="end">
                            <Button type="primary">Buscar</Button>
                        </Row>
                    </Card>
                </Row>
                <Row>
                    <RepositoriosTable
                        repositorios={this.state.repositorios}
                    >
                    </RepositoriosTable>
                </Row>
            </Row>
        );
    }
}

export default Repositorios;