import React, { Component } from 'react'
import { Table } from 'antd';
import { getUsers } from '../../services/user-service';

export default class Usuarios extends Component {


    constructor() {
        super()
        this.state = {
            users: [],
            selectedIds: []
        }
        getUsers().then(_users => {
            console.log(_users)
            const users = _users.map(user => {
                return { ...user, admin: user.admin.toString(), key: user.id }
            })
            this.setState({ users })
        })
    }



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
            }

        ];
        return (
            <React.Fragment>
                <h2>Users</h2>
                <Table dataSource={this.state.users} columns={columns} rowSelection={rowSelection} />
            </React.Fragment>
        )
    }
}
