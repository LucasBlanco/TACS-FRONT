import { Button, Icon, Input, message, Table } from 'antd';
import { saveAs } from 'file-saver';
import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';

import { getGitIgnoreTemplates } from '../../services/repositories-service';


class GitIgnoreTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = {templates: []}
        const hide = message.loading('Action in progress..', 0);
        getGitIgnoreTemplates().then(templates => {
            this.setState({templates})
            hide()
        })
    }

    downloadTemplate = (name) => {
        const downloadUrl = this.state.templates.find(t => t.name === name).downloadUrl
        saveAs(downloadUrl, name)
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
        </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
        </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}} />
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
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name')
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (

                    <Button onClick={() => this.downloadTemplate(record.name)}>Download</Button>
                ),
            },
        ];
        return (
            <Table
                dataSource={this.state.templates}
                columns={columns}
            />
        );
    }
}

export default GitIgnoreTemplates;