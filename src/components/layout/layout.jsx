import { Card, Layout, Menu } from 'antd';
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import auth from '../../services/auth';
import authService from '../../services/auth-service';
import Estadisticas from '../estadisticas/estadisticas';
import Favoritos from '../favoritos/favoritos';
import GitIgnoreTemplates from '../gitignoreTemplates/gitignoreTemplates';
import Landing from '../landing/landing';
import Repositorios from '../repositorios/repositorios';
import Usuarios from '../usuarios/usuarios';


const {Header, Content, Sider} = Layout;

class MainLayout extends Component {
    state = {}
    render() {
        return (
            <Layout style={{minHeight: '-webkit-fill-available'}}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                    }}
                    onCollapse={(collapsed, type) => {
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" style={{marginTop: '3rem'}}>
                        <Menu.Item key="1" style={auth.isAdmin ? {display: 'none'} : {}}>
                            <Link to="/app/repositorios">
                                <span className="nav-text">Repositories</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" style={auth.isAdmin ? {display: 'none'} : {}} >
                            <Link to="/app/favoritos">
                                <span className="nav-text">Favourites</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3"  >
                            <Link to="/app/gitignoreTemplates">
                                <span className="nav-text" style={auth.isAdmin ? {display: 'none'} : {}}>Git ignore templates</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="4" style={!auth.isAdmin ? {display: 'none'} : {}}>
                            <Link to="/app/usuarios">
                                <span className="nav-text">Users</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5" style={!auth.isAdmin ? {display: 'none'} : {}}>
                            <Link to="/app/estadisticas">
                                <span className="nav-text">Stats</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="6">
                            <Link to="/" onClick={() => authService.logout()}>
                                <span className="nav-text">Log out</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}} />
                    <Content style={{margin: '50px 50px 0'}}>
                        <Card>
                            <Route path="/app/repositorios" component={Repositorios}></Route>
                            <Route path="/app/favoritos" component={Favoritos}></Route>
                            <Route path="/app/estadisticas" component={Estadisticas}></Route>
                            <Route path="/app/usuarios" component={Usuarios}></Route>
                            <Route path="/app/gitignoreTemplates" component={GitIgnoreTemplates}></Route>
                            <Route exact path="/app" component={Landing}></Route>
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;