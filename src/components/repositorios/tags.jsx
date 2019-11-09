import React, { Component } from 'react'
import { Button, Modal, List } from 'antd'
import { getTags } from '../../services/repositories-service';

class Tags extends Component {

    state = {
        tags: null,
        visible: false
    };

    constructor(props) {
        super(props)

        getTags(this.props.repo).then(tags =>
            this.setState({
                tags: tags
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
                    Get Tags
                    </Button>
                <Modal
                    title="tagsss"
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
                        dataSource={this.state.tags}
                        renderItem={item => <List.Item>{item.nane} Download links {item.zipball_url}  {item.tarball_url}</List.Item>}
                    />
                </Modal>
            </div>
        );
    }
}

export default Tags;