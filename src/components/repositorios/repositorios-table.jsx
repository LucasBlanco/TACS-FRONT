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
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
        }
    ];
    return (
        <Table dataSource={repositorios} columns={columns} />
    )
}
