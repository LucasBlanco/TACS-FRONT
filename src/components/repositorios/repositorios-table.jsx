import React from 'react'
import { Table } from 'antd'
import Contributors from './contributors';
import Commits from './commits';

export const RepositoriosTable = ({ repositories, rowSelection, pagination, handleTableChange }) => {

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
        },
        {
            title: 'Contributors',
            key: 'contributors',
            render: (text, record) => (
                <span>
                    <Contributors
                        repo={record}
                    />
                </span>
            ),
        },
        {
            title: 'Commits',
            key: 'commits',
            render: (text, record) => (
                <span>
                    <Commits
                        repo={record}
                    />
                </span>
            ),
        },
    ];
    return (
        <Table
            dataSource={repositories}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{ ...pagination, pageSize: 30 }}
            onChange={handleTableChange}
            scroll={{
                x: true,
                y: false,
                scrollToFirstRowOnChange: true
            }}
        />
    )
}
