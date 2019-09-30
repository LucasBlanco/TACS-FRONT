import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Row, Col, Button, Input, message, DatePicker } from "antd";
import { RepositoriosTable } from "../repositorios/repositorios-table";
import { getAllFavourites, getFavouriteByName } from '../../services/favorites-service';
const { RangePicker } = DatePicker;
class Estadisticas extends React.Component {
    state = {
        repositories: [],
        totalAmount: 0
    };

    handleSearch = (event) => {
        this.props.form.validateFields((err, values) => {
            console.log(err)
            if (!err) {
                const hide = message.loading('Action in progress..', 0);
                const { name, range } = values
                if (!name) {
                    const since = range[0].format('YYYY-MM-DD')
                    const to = range[1].format('YYYY-MM-DD')
                    getAllFavourites(0, 10, since, to).then(({ totalAmount, repositories }) => {
                        hide()
                        const favorites = repositories.map(repo => {
                            return { ...repo, key: repo.id }
                        })
                        this.setState({ repositories: favorites, totalAmount })
                    }).catch(error => {
                        hide()
                        message.error(error.response.data);
                    })
                } else {
                    getFavouriteByName(name).then(repo => {
                        hide()
                        this.setState({ repositories: [{ ...repo, key: repo.id }], totalAmount: 1 })
                    }).catch(error => {
                        hide()
                        message.error(error.response.data);
                    })
                }

            }
        });
        event.preventDefault();
    };

    handleReset = () => {
        this.setState({ repositories: [] })
        this.props.form.resetFields(['name', 'range'])
    };


    render() {
        const { getFieldDecorator } = this.props.form
        const decorators = {
            range: getFieldDecorator('range', { rules: [] }),
            name: getFieldDecorator('name', { rules: [] })
        }

        const formHasDates = () => {
            const { form } = this.props;
            return !!(form.getFieldValue('range'))
        }

        const formHasName = () => {
            const { form } = this.props;
            return !!(form.getFieldValue('name'))
        }

        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item label="Range:">
                            {
                                decorators.range(
                                    <RangePicker disabled={formHasName()} />

                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Name:">
                            {
                                decorators.name(
                                    <Input placeholder="TACS" disabled={formHasDates()} />
                                )
                            }
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
                    <RepositoriosTable repositories={this.state.repositories} />
                </Row>
            </Form>
        );
    }
}

const WrappedEstForm = Form.create({ name: 'estadisticasForm' })(Estadisticas);


export default WrappedEstForm;
