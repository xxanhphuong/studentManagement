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
import { NavLink } from "react-router-dom";

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
            <NavLink to="/class">Class</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <NavLink to="/subject">Subject</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <NavLink to="/score">Score</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<DesktopOutlined />}>
            <NavLink to="/major">Major</NavLink>
          </Menu.Item>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="User">
            <Menu.Item key="5">
              <NavLink to="/teacher">Teacher</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/student">Student</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Nav />
        <Content style={{ margin: "16px" }}>
          <MainRoutes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by me
        </Footer>
      </Layout>
    </Layout>
  );
}
