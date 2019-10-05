import React, { Component } from 'react'

import { RepositoryFilters, ContainsWordFilter, LanguageFilter, StarsFilter, SizeFilter, ForksFilter } from '../../models/repository-filters';
import { message, Card, Row, Button, Input, Form, Col, Typography } from 'antd';

const { Title } = Typography
export default class RepositoryFilterForm extends Component {

    constructor() {
        super()
        this.state = {
            containsWordFilter: new ContainsWordFilter(null, null),
            languageFilter: new LanguageFilter(null),
            sizeFilter: new SizeFilter(null, null),
            starsFilter: new StarsFilter(null, null),
            forksFilter: new ForksFilter(null, null)
        }
    }

    generateFilters = () => {
        const repositoryFilters = new RepositoryFilters([
            this.state.containsWordFilter,
            this.state.languageFilter,
            this.state.sizeFilter,
            this.state.starsFilter,
            this.state.forksFilter
        ])
        return repositoryFilters
    }

    getRepos = () => {
        const repositoryFilters = this.generateFilters()
        if (!repositoryFilters.hasFilters()) {
            message.error("Ingrese al menos un filtro")
            return
        }
        this.props.getRepos(repositoryFilters)
    }

    getNextRepos = () => {
        const repositoryFilters = this.generateFilters()
        if (!repositoryFilters.hasFilters()) {
            message.error("Ingrese al menos un filtro")
            return
        }
        this.props.getNextRepos(repositoryFilters)
    }

    changeContainsWordFilter = (words) => this.setState({ containsWordFilter: new ContainsWordFilter(words) })
    
    changeLanguageFilter = (language) => this.setState({ languageFilter: new LanguageFilter(language) })

    changeSizeFilter = (min, max) => this.setState({ sizeFilter: new SizeFilter(min, max) })

    changeStarsFilter = (min, max) => this.setState({ starsFilter: new StarsFilter(min, max) })

    changeForksFilter = (min, max) => this.setState({ forksFilter: new ForksFilter(min, max) })

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Card>
                <Row>
                    <Title level={3}>Filters</Title>
                </Row>
                <Row gutter={24} type="flex" justify="start">
                    <Form  {...formItemLayout}>
                        <Col lg={8}>
                            <Form.Item label="Size">
                                <Input
                                    addonBefore=">"
                                    placeholder="1"
                                    min={0}
                                    value={this.state.sizeFilter.min}
                                    onChange={e => this.changeSizeFilter(e.target.value, this.state.sizeFilter.max)}
                                />
                                <Input
                                    addonBefore="<"
                                    placeholder="1"
                                    min={0}
                                    value={this.state.sizeFilter.max}
                                    onChange={e => this.changeSizeFilter(this.state.sizeFilter.min, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item label="Stars">
                                <Input
                                    addonBefore=">"
                                    placeholder="1"
                                    min={0}
                                    value={this.state.starsFilter.min}
                                    onChange={e => this.changeStarsFilter(e.target.value, this.state.starsFilter.max)}
                                />
                                <Input
                                    addonBefore="<"
                                    placeholder="1"
                                    min={0}
                                    value={this.state.starsFilter.max}
                                    onChange={e => this.changeStarsFilter(this.state.starsFilter.min, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item label="Forks">
                                <Input
                                    addonBefore=">"
                                    placeholder="1"
                                    min={0}
                                    value={this.state.forksFilter.min}
                                    onChange={e => this.changeForksFilter(e.target.value, this.state.forksFilter.max)}
                                />
                                <Input
                                    addonBefore="<"
                                    placeholder="1"
                                    min={0}
                                    value={this.state.forksFilter.max}
                                    onChange={e => this.changeForksFilter(this.state.forksFilter.min, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item label="Language">
                                <Input
                                    placeholder="Java"
                                    value={this.state.languageFilter.language}
                                    onChange={e => this.changeLanguageFilter(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item label="Words">
                                <Input
                                    placeholder="GitHub API"
                                    value={this.state.containsWordFilter.words}
                                    onChange={e => this.changeContainsWordFilter(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Form>
                </Row>
                <Row type="flex" justify="end">
                    <Button type="primary" onClick={this.getRepos}>Search</Button>
                </Row>
            </Card>
        )
    }
}
