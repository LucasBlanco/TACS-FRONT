import React from 'react'
import { Table } from 'antd'

export const RepositoriosTable = ({ repositorios }) => {


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    return (
        <Table dataSource={repositorios} columns={columns} />
    )
}
