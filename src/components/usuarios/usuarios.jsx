import React, { Component } from 'react'
import { Table, Row, Col, Button, Modal, List, message } from 'antd';
import { getUsers, compare } from '../../services/user-service';

export default class Usuarios extends Component {


    constructor() {
        super()
        this.state = {
            users: [],
            selectedIds: [],
            comparison: {
                repositories: [],
                languages: []
            },
            showComparison: false
        }
        const hide = message.loading('Action in progress..', 0);
        getUsers().then(_users => {
            hide()
            console.log(_users)
            const users = _users.map(user => {
                return {
                    ...user,
                    admin: user.admin.toString(),
                    key: user.id,
                    languages: user.languages.join(', ')
                }
            })
            this.setState({ users })
        })
    }

    getComparison = () => {
        const hide = message.loading('Action in progress..', 0);
        console.log(this.state.selectedIds)
        const [id1, id2] = this.state.selectedIds
        compare(id1, id2).then(comparison => {
            hide()
            this.setState({ comparison, showComparison: true })
        })
    }

    hideModal = () => this.setState({ showComparison: false })


    render() {


        const rowSelection = {
            selectedRowKeys: this.state.selectedIds,
            onChange: (selectedRowKeys, selectedRows) => {
                if (selectedRowKeys.length > 2) {
                    const [key1, key2, ...keys] = selectedRowKeys
                    this.setState({ selectedIds: [key1, key2] })
                } else {
                    this.setState({ selectedIds: selectedRowKeys })
                }
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        const columns = [
            {
                title: 'User name',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Admin',
                dataIndex: 'admin',
                key: 'admin',
            },
            {
                title: 'Favourites',
                dataIndex: 'nofFavourites',
                key: 'nofFavourites',
            },
            {
                title: 'Last login data',
                dataIndex: 'lastLoginDate',
                key: 'lastLoginDate',
            }

        ];
        return (
            <React.Fragment>
                <h2>Users</h2>
                <Table dataSource={this.state.users} columns={columns} rowSelection={rowSelection} />
                <Row type="flex" justify="end">
                    <Col>
                        <Button type="primary" size={10} onClick={() => this.getComparison()}>
                            Comparar
                    </Button>
                    </Col>
                </Row>

                <Modal
                    title="Comparison"
                    visible={this.state.showComparison}
                    onCancel={this.hideModal}
                    onOk={this.hideModal}
                >
                    <List style={{ marginBottom: '20px' }}
                        header={<div>Repositories</div>}
                        bordered
                        dataSource={this.state.comparison.repositories}
                        renderItem={item => (
                            <List.Item>
                                {item.name}
                            </List.Item>
                        )}
                    />
                    <List
                        header={<div>Languages</div>}
                        bordered
                        dataSource={this.state.comparison.languages}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                </Modal>

            </React.Fragment>
        )
    }
}
