import React, { Component } from 'react'
import { Table, Row, Col, Button, Modal, List, message, Input, Icon } from 'antd';
import { getUsers, compare } from '../../services/user-service';
import Highlighter from 'react-highlight-words';
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
            showComparison: false,
            searchText: ''
        }
        const hide = message.loading('Action in progress..', 0);
        getUsers().then(_users => {
            hide()
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
        const [id1, id2] = this.state.selectedIds
        compare(id1, id2).then(comparison => {
            hide()
            this.setState({ comparison, showComparison: true })
        })
    }

    hideModal = () => this.setState({ showComparison: false })

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
        </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
        </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

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
            }
        };

        const columns = [
            {
                title: 'User name',
                dataIndex: 'username',
                key: 'username',
                ...this.getColumnSearchProps('username')
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
            },
            {
                title: 'Favourites languages',
                dataIndex: 'languages',
                key: 'languages',
            }

        ];
        return (
            <React.Fragment>
                <h2>Users</h2>
                <Table dataSource={this.state.users} columns={columns} rowSelection={rowSelection} />
                <Row type="flex" justify="end">
                    <Col>
                        <Button type="primary" onClick={() => this.getComparison()}>
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
