import React, { Component } from 'react'
import { Table, Row, Col, Button, Input, Icon } from 'antd';
import { getOwnFavorites, deleteFavourite } from '../../services/favorites-service';
import Highlighter from 'react-highlight-words';
export default class Favoritos extends Component {


    constructor() {
        super()
        this.state = {
            favorites: [],
            selectedIds: [],
            searchText: ''
        }
        getOwnFavorites().then(repos => {

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
                this.setState({ selectedIds: selectedRowKeys })
            }
        };

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name')
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
                title: 'Number Of Forks',
                dataIndex: 'forks',
                key: 'forks',
            },
            {
                title: 'Size (KB)',
                dataIndex: 'size',
                key: 'size',
            },

        ];
        return (
            <React.Fragment>
                <h2>Favorites</h2>
                <Table dataSource={this.state.favorites} columns={columns} rowSelection={rowSelection} />
                <Row type="flex" justify="end">
                    <Col>
                        <Button type="danger" onClick={this.deleteSelectedFavorites}>
                            Delete
                    </Button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
