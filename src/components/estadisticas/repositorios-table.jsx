import React from 'react'
import { Table } from 'antd'

export const RepositoriosTable = ({ repositories, pagination, handleTableChange }) => {

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
        },
        {
            title: 'Forks',
            dataIndex: 'forks',
            key: 'forks',
        },
        {
            title: 'Issues',
            dataIndex: 'issues',
            key: 'issues',
        },
        {
            title: 'Stars',
            dataIndex: 'stars',
            key: 'stars',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
        },
        {
            title: 'Nro Favorites',
            dataIndex: 'favs',
            key: 'favs',
        },
        {
            title: 'Size (KB)',
            dataIndex: 'size',
            key: 'size',
        }
    ];
    return (
        <Table dataSource={repositories} columns={columns} pagination={pagination}
            onChange={handleTableChange} />
    )
}
