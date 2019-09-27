import React, { Component } from 'react'
import { Table, Row, Col, Button } from 'antd';
import { getFavorites, deleteFavourite } from '../../services/favorites';
import { Repository } from '../../models/repository';

export default class Favoritos extends Component {


    constructor() {
        super()
        this.state = {
            favorites: [],
            selectedIds: []
        }
        getFavorites().then(repos => {

            const favorites = repos.map(repo => {
                return { ...repo, key: repo.id }
            })
            this.setState({ favorites })
        })
    }

    deleteSelectedFavorites = () => {
        this.state.selectedIds.forEach(id => {
            deleteFavourite(id).then(() => {
                const filteredFavorites = this.state.favorites.filter(fav => fav.id !== id)
                this.setState({ favorites: filteredFavorites })
            })
        })

    }

    render() {

        const rowSelection = {
            selectedRowKeys: this.state.selectedIds,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedIds: selectedRowKeys })
            }
        };

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Registration Date',
                dataIndex: 'registrationDate',
                key: 'registrationDate',
            },
            {
                title: 'Stars',
                dataIndex: 'stars',
                key: 'stars',
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
                key: 'owner',
            },
            {
                title: 'Favs',
                dataIndex: 'favs',
                key: 'favs',
            },
            {
                title: 'Total Commits',
                dataIndex: 'totalCommits',
                key: 'totalCommits',
            },
            {
                title: 'Main Language',
                dataIndex: 'language',
                key: 'language',
            },
            {
                title: 'Total Issues',
                dataIndex: 'issues',
                key: 'issues',
            },
            {
                title: 'Source',
                dataIndex: 'source',
                key: 'source',
            },
            {
                title: 'Number Of Forks',
                dataIndex: 'forks',
                key: 'forks',
            },

        ];
        return (
            <React.Fragment>
                <h2>Favorites</h2>
                <Table dataSource={this.state.favorites} columns={columns} rowSelection={rowSelection} />
                <Row type="flex" justify="end">
                    <Col>
                        <Button type="danger" size={10} onClick={this.deleteSelectedFavorites}>
                            Delete
                    </Button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
