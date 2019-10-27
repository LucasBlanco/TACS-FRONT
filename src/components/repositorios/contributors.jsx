import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { getContributors } from '../../services/repositories-service';

class Contributors extends Component {

    state = {
        contributors: null,
        visible: false
    };

    showModal = () => {
        console.log(this.props.repo)
        console.log(this.props.contributors)
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        console.log(this.props.repo)
        console.log(this.props.contributors)
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
                    title="Contributors"
                    visible={this.state.visible}
                    footer={[
                        <Button key="Ok" onClick={this.handleOk}>
                            Ok
                        </Button>
                    ]}
                >
                    <p>{this.state.repo}</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

export default Contributors;