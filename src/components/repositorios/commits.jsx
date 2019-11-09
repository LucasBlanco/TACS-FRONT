import React, { Component } from 'react'
import { Button, Modal, List } from 'antd'
import { getCommits } from '../../services/repositories-service';

class Commits extends Component {

    state = {
        commits: null,
        visible: false
    };

    constructor(props) {
        super(props)

        getCommits(this.props.repo).then(commits =>
            this.setState({
                commits: commits
            })
        )
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    render() {

        return (
            <div>
                <Button type="link" onClick={() => this.setState({ visible: true })}>
                    Commits
                    </Button>
                <Modal
                    title="Last 30 Commits"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="Ok" onClick={this.handleOk}>
                            Ok
                        </Button>
                    ]}
                >
                    <List
                        size="small"
                        bordered
                        dataSource={this.state.commits}
                        renderItem={item => <List.Item>{item.message}</List.Item>}
                    />
                </Modal>
            </div>
        );
    }
}

export default Commits;