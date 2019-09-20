import React, { Component } from 'react'
import { Row, Col } from 'antd'
export default class Landing extends Component {
    render() {
        return (
            <Row type="flex" justify="center">
                <Col >
                    <img src={require('./customLogo.jpeg')}></img>
                </Col>
            </Row>

        )
    }
}
