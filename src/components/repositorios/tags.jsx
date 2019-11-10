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
                    width='30%'
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
                        size="medium"
                        bordered
                        dataSource={this.state.tags}
                        renderItem={item => <List.Item>{item.name} download links: 
                                        <Button type="link" onClick={() =>  window.open( item.zipball_Url, item.zipball_Url )}>
                                            {'Zipball'}
                                        </Button>
                                        <Button type="link" onClick={() =>  window.open( item.tarball_Url, item.tarball_Url )}>
                                            {'Tarball'}
                                        </Button>
                                        </List.Item>}        
                    />
                </Modal>
            </div>
        );
    }
}

export default Tags;