import React, { Component } from "react";
import { Layout, Menu } from "antd";
import 'antd/dist/antd.css';
import RacingTattoo from '../tattooGenerator';
import { siteConfig } from "../../settings";

const { Header, Footer, Content } = Layout;

export default class index extends Component {
  render() {
    return (
      <div>
          {/* <ParcelStyle> */}
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{ lineHeight: "64px" }}
                    >
                    <Menu.Item key="1">GeekRacing Tattoo</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: "0 50px" }}>

                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                      <RacingTattoo />

                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    {siteConfig.footerText} {siteConfig.version}
                </Footer>   
            </Layout>
        {/* </ParcelStyle> */}
      </div>
    );
  }
}
