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
import { NavLink, useLocation } from "react-router-dom";
import Add from "../user/Add";
import { getRole } from "@iso/helpers/";
import { userRole } from "@iso/helpers/contant";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export function Main() {
  const [collapsed, setCollapsed] = useState(false);
  let location = useLocation();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  console.log("location", location.pathname.split("/")[1]);
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
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname.split("/")[1]]}
          mode="inline"
        >
          <Menu.Item key="class" icon={<PieChartOutlined />}>
            <NavLink to="/class">Class</NavLink>
          </Menu.Item>
          <Menu.Item key="subject" icon={<UserOutlined />}>
            <NavLink to="/subject">Subject</NavLink>
          </Menu.Item>
          <Menu.Item key="score" icon={<DesktopOutlined />}>
            <NavLink to="/score">Score</NavLink>
          </Menu.Item>
          <Menu.Item key="major" icon={<DesktopOutlined />}>
            <NavLink to="/major">Major</NavLink>
          </Menu.Item>
          {getRole() == userRole?.ADMIN && (
            <SubMenu key="sub2" icon={<TeamOutlined />} title="User">
              <Menu.Item key="teacher">
                <NavLink to="/teacher">Teacher</NavLink>
              </Menu.Item>
              <Menu.Item key="studen">
                <NavLink to="/student">Student</NavLink>
              </Menu.Item>
              <Menu.Item key="user">
                <NavLink to="/user">User</NavLink>
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Nav />
        <Content style={{ margin: "16px" }}>
          <MainRoutes />
          <Add />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by me
        </Footer>
      </Layout>
    </Layout>
  );
}
