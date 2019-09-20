
import React, { Component } from 'react';

import { Layout, Menu, Card } from 'antd';
import { Route, Link } from 'react-router-dom'
import Repositorios from '../repositorios/repositorios';
import Favoritos from '../favoritos/favoritos';
import CompararFavoritos from '../comparar-favoritos/comparar-favoritos';
import Estadisticas from '../estadisticas/estadisticas';
import Usuarios from '../usuarios/usuarios';
import Landing from '../landing/landing';

const { Header, Content, Sider } = Layout;


class MainLayout extends Component {
    state = {}
    render() {
        return (
            <Layout style={{ minHeight: '-webkit-fill-available' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ marginTop: '3rem' }}>
                        <Menu.Item key="1" >
                            <Link to="/app/repositorios">
                                <span className="nav-text">Repositorios</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" >
                            <Link to="/app/favoritos">
                                <span className="nav-text">Favoritos</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/app/usuarios">
                                <span className="nav-text">Usuarios</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/app/comparar-favoritos">
                                <span className="nav-text">Comparar favoritos</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/app/estadisticas">
                                <span className="nav-text">Estadisticas</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/">
                                <span className="nav-text">Log out</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '50px 50px 0' }}>
                        <Card>
                            <Route path="/app/repositorios" component={Repositorios}></Route>
                            <Route path="/app/favoritos" component={Favoritos}></Route>
                            <Route path="/app/comparar-favoritos" component={CompararFavoritos}></Route>
                            <Route path="/app/estadisticas" component={Estadisticas}></Route>
                            <Route path="/app/usuarios" component={Usuarios}></Route>
                            <Route exact path="/app" component={Landing}></Route>
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;