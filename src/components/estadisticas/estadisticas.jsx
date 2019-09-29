import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Row, Col, Button, DatePicker } from "antd";
import { RepositoriosTable } from "../repositorios/repositorios-table";
import { getAllFavourites } from '../../services/favorites';

export default class Estadisticas extends React.Component {
    state = {
        repositorios: [],
        totalAmount: 0
    };

    handleSearch = (event) => {
        getAllFavourites(0, 10, event.since, event.to).then(({ totalAmount, repositories }) => {
            const favorites = repositories.map(repo => {
                return { ...repo, key: repo.id }
            })
            this.setState({ repositorios: favorites, totalAmount })
        })
        event.preventDefault();
    };

    handleReset = () => {
        this.setState({ repositorios: [] })
    };

    render() {
        return (
            <div>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="Since:">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="To:">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: "right" }}>
                            <Button type="primary" htmlType="submit">
                                Search
                        </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Clear
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                        <h3> Total amount: {this.state.totalAmount}</h3>
                    </Row>
                    <Row>
                        <RepositoriosTable repositorios={this.state.repositorios} />
                    </Row>
                </Form>

            </div>
        );
    }
}

