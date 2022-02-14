import React from "react";
import { Layout, Menu } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeOutlined,
    SnippetsOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "../resources/layout.css";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default class DefaultLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">
                        <p>Checkout</p>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={window.location.pathname}
                    >
                        <Menu.Item key="/home" icon={<HomeOutlined />}>
                            <Link to="/home">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="/bills" icon={<SnippetsOutlined />}>
                            <Link to="/bills">Bills</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="/items"
                            icon={<UnorderedListOutlined />}
                        >
                            <Link to="/items">Items</Link>
                        </Menu.Item>
                        <Menu.Item key="/customers" icon={<UserOutlined />}>
                            <Link to="/customers">Customers</Link>
                        </Menu.Item>
                        <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                            Logout
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{ padding: 10 }}
                    >
                        {React.createElement(
                            this.state.collapsed
                                ? MenuUnfoldOutlined
                                : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: this.toggle,
                            }
                        )}
                        <div className="cart-count">

                        </div>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: "10px",
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
