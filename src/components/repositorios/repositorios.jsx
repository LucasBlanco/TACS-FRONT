import React, { Component } from 'react'
import { Row, message, Col, Button } from 'antd';
import { RepositoriosTable } from './repositorios-table';
import { getRepositories } from '../../services/repositories-service';
import { addFavourite } from '../../services/favorites-service';
import RepositoryFilterForm from './repository-filters';


class Repositorios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repositories: [],
            nextPage: null,
            selectedIds: [],
            pagination: {},
            filters: null,
            loaded: 0
        }
    }

    /*getRepos = (repositoryFilter) => {
        const hide = message.loading('Action in progress..', 0);
        getRepositories({ repositoryFilter })
            .then(({ nextPage, repositories }) => {
                hide()
                this.setState({ repositories: repositories.map(repo => ({ ...repo, key: repo.id })), nextPage })
            }).catch(error => {
                hide()
                error.response && message.error(error.response.data);
            })
    }*/

    getRepos = ({ repositoryFilter, nextPage }) => {
        const hide = message.loading('Action in progress..', 0);
        getRepositories({ repositoryFilter, nextPage })
            .then(({ totalRepositories, repositories }) => {
                hide()
                const newRepos = this.state.repositories.concat(repositories.map(repo => ({ ...repo, key: repo.id })))
                this.setState({ repositories: newRepos, pagination: { total: totalRepositories }, loaded: this.state.loaded + 30 })
            }).catch(error => {
                hide()
                error.response && message.error(error.response.data);
            })
    }

    addToFavourites = () => {
        const hide = message.loading('Action in progress..', 0);
        this.state.selectedIds
            .map(id => this.state.repositories.find(r => r.id === id))
            .forEach(repo => {
                addFavourite(repo)
                    .then(() => {
                        hide()
                        message.success("The repository was added to your favourite's list");
                    }).catch(error => {
                        hide()
                        error.response && message.error(error.response.data);
                    })
            })

    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        if (pagination.current % 3 === 0 && this.state.loaded <= pagination.current * 10) {
            console.log("Next page:")
            console.log(Math.ceil(pagination.current / 3) + 1)
            this.getRepos({
                repositoryFilter: this.state.filters,
                nextPage: Math.ceil(pagination.current / 3) + 1
            });
        }
    };


    render() {
        const rowSelection = {
            selectedRowKeys: this.state.selectedIds,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedIds: selectedRowKeys })
            }
        };
        return (
            <Row>
                <Row style={{ paddingBottom: 20 }}>
                    <RepositoryFilterForm
                        getRepos={(filters) => {
                            this.setState({ filters })
                            this.getRepos({ repositoryFilter: filters })
                        }}
                        getNextRepos={(filters) => this.getRepos({ repositoryFilter: filters, nextPage: this.state.nextPage })}
                        nextPage={this.state.nextPage}>
                    </RepositoryFilterForm>
                </Row>
                <Row>
                    <RepositoriosTable
                        repositories={this.state.repositories}
                        rowSelection={rowSelection}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                        handleTableChange={this.handleTableChange}
                    >
                    </RepositoriosTable>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col span={12}>
                        <Button type="primary" size={10} onClick={this.addToFavourites}>
                            Add to favorites
                        </Button>
                    </Col>

                </Row>
            </Row>
        );
    }
}

export default Repositorios;