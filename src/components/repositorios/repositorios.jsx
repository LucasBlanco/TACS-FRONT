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
            selectedIds: []
        }
    }

    handleSubmit = (repositoryFilters) => {
        const hide = message.loading('Action in progress..', 0);
        getRepositories(repositoryFilters)
            .then(({ nextPage, repositories }) => {
                hide()
                this.setState({ repositories: repositories.map(repo => ({ ...repo, key: repo.id })) })
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
                    <RepositoryFilterForm handleSubmit={this.handleSubmit}>

                    </RepositoryFilterForm>
                </Row>
                <Row>
                    <RepositoriosTable
                        repositories={this.state.repositories}
                        rowSelection={rowSelection}
                    >
                    </RepositoriosTable>
                </Row>
                <Row type="flex" justify="end" style={{ marginTop: 10 }}>
                    <Col>
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