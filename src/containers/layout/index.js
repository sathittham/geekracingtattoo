import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import 'antd/dist/antd.css';
import Parcel from '../parcel';
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
                    <Menu.Item key="1">จัดการพัสดุ</Menu.Item>
                    <Menu.Item key="2">ตั้งค่า</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    {/* <Breadcrumb style={{ margin: "16px 0" }}>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div>
                      <Parcel />
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
