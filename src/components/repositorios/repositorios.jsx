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
            filters: null
        }
    }

    getRepos = ({ repositoryFilter, nextPage }) => {
        const hide = message.loading('Action in progress..', 0);
        getRepositories({ repositoryFilter, nextPage })
            .then(({ totalRepositories, repositories }) => {
                hide()
                const totalRepos = totalRepositories > 1000 ? 1000 : totalRepositories
                const repos = repositories.map(repo => {
                    return { ...repo, key: repo.id }
                })
                this.setState({ repositories: repos, pagination: { total: totalRepos } })
            }).catch(error => {
                hide()
                error.response && message.error(error.response.data);
            })
    }

    addToFavourites = () => {
        const hide = message.loading('Action in progress..', 0);
        const selectedRepos = this.state.selectedIds.map(id => this.state.repositories.find(r => r.id === id))
        const promises = selectedRepos.map(repo => addFavourite(repo))
        Promise.allSettled(promises).then(results => {
            hide()
            const resultsWithIndex = results.map((result, index) => ({ index, result }))
            const rejecteds = resultsWithIndex.filter(r => r.result.status === 'rejected')
            const fulfilleds = resultsWithIndex.filter(r => r.result.status === 'fulfilled')
            if (rejecteds.length > 0) {
                message.error(
                    rejecteds
                        .map(({ index, result }) => selectedRepos[index].name + ': ' + result.reason.response.data)
                        .join(', '), 5
                )
            }
            if (fulfilleds.length > 0) {
                /*message.success(
                    fulfilleds
                        .map(({ index, result }) => selectedRepos[index].name + ": Has been added to your favourite's list")
                        .join(', '), 5
                )*/
                message.success("The repositories had been added to your favourites")
            }
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({ pagination: pager });
        this.getRepos({
            repositoryFilter: this.state.filters,
            nextPage: pagination.current
        });
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
                            this.setState({ filters, pagination: { ...this.state.pagination, current: 1 } })
                            this.getRepos({ repositoryFilter: filters })
                        }}>
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
                        <Button type="primary" onClick={this.addToFavourites}>
                            Add to favorites
                        </Button>
                    </Col>

                </Row>
            </Row>
        );
    }
}

export default Repositorios;