import React, { useState } from "react";
import { Badge, Layout, Menu } from "antd";
import "./Home.css";
import People from "../People/People";

const { Header, Content } = Layout;

const Home = () => {
  const [activeMenu, setActiveMenu] = useState("2");

  const handleMenuClick = (e) => {
    setActiveMenu(e.key);
  };

  const RenderContent = () => {
    switch (activeMenu) {
      case "1":
        return <div>Content for Company</div>;
      case "2":
        return <People />;
      case "3":
        return <div>Content for Violations</div>;
      case "4":
        return <div>Content for Statistics</div>;
      case "5":
        return <People isEditable />;
      case "6":
        return <div>Content for Profile</div>;
      case "7":
        return <div>Content for Logout</div>;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <Layout>
      <Header className="navbar">
        <div className="navbar-content">
          <Menu
            theme="dark"
            mode="horizontal"
            className="left-menu"
            onClick={handleMenuClick}
            selectedKeys={
              activeMenu && ["1", "2", "3", "4", "5"].includes(activeMenu)
                ? [activeMenu]
                : []
            }
          >
            <Menu.Item key="1">Company</Menu.Item>
            <Menu.Item key="2">
              <Badge count={50} offset={[16, 0]}>
                <div className="tabs">People</div>
              </Badge>
            </Menu.Item>
            <Menu.Item key="3">
              <Badge count={50} offset={[16, 0]}>
                <div className="tabs">Violations</div>
              </Badge>
            </Menu.Item>
            <Menu.Item key="4">Statistics</Menu.Item>
            <Menu.Item key="5">Settings</Menu.Item>
          </Menu>
          <Menu
            theme="dark"
            mode="horizontal"
            className="right-menu"
            onClick={handleMenuClick}
            selectedKeys={
              activeMenu && ["6", "7"].includes(activeMenu) ? [activeMenu] : []
            }
          >
            <Menu.Item key="6">Profile</Menu.Item>
            <Menu.Item key="7">Logout</Menu.Item>
          </Menu>
        </div>
      </Header>
      <Layout className="content-container">
        <Content className="content">
          <RenderContent />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
