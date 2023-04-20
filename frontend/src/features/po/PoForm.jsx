import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import PoTableTest from "./PoTableTest";

const { Header, Sider, Content } = Layout;

export const PoForm = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentNav, setCurrentNav] = useState("nav1");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleNavClick = (e) => {
    setCurrentNav(e.key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "nav1",
              icon: <VideoCameraOutlined />,
              label: "Keystone",
            },
            {
              key: "nav2",
              icon: <UserOutlined />,
              label: "Meyer",
            },
            {
              key: "nav3",
              icon: <UploadOutlined />,
              label: "Omix-Ada",
            },
          ]}
          onSelect={handleNavClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />{" "}
          PURCHASE ORDERS DETAILS
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {currentNav === "nav1" ? (
            <div>
              <PoTableTest vendorId="1" for Keystone />
            </div>
          ) : currentNav === "nav2" ? (
            <div>
              <PoTableTest vendorId="2" for Meyer />
            </div>
          ) : currentNav === "nav3" ? (
            <div>
              <PoTableTest vendorId="3" for Omix />
            </div>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};
