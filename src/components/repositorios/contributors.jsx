import React, { Component } from 'react'
import { Button, Modal, List } from 'antd'
import { getContributors } from '../../services/repositories-service';

class Contributors extends Component {

    state = {
        contributors: null,
        visible: false
    };

    constructor(props) {
        super(props)

        getContributors(this.props.repo).then(contributors =>
            this.setState({
                contributors: contributors
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
                    Get Contributors
                    </Button>
                <Modal
                    title="Top 30 Contributors"
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
                        dataSource={this.state.contributors}
                        renderItem={item => <List.Item>{item.username} made {item.contributions} contributions </List.Item>}
                    />
                </Modal>
            </div>
        );
    }
}

export default Contributors;