import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "@iso/assets/img/logo.png";
import { Nav } from "@iso/components/Nav";
import MainRoutes from "./MainRoutes";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export function Main() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width="250"
      >
        <div
          style={{ height: 56 }}
          className="flex items-center justify-center"
        >
          <img
            src={logo}
            alt="logo"
            className="h-full object-contain"
            style={{ width: "90%" }}
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Nav />
        <Content style={{ margin: "0 16px" }}>
          <MainRoutes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by me
        </Footer>
      </Layout>
    </Layout>
  );
}
