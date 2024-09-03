import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Badge, Layout, Menu, Spin } from "antd";
import axios from "axios";
import "./Home.css";
import People from "../People/People";

const { Header, Content } = Layout;

const Home = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState("2");
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMenuClick = (e) => {
    setActiveMenu(e.key);
  };

  const fetchPeopleData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/people/details`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userDetails"))?.token
            }`,
          },
        }
      );
      setPeopleData(response.data.data);
    } catch (error) {
      console.error("Error fetching people data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeMenu === "2" || activeMenu === "5") {
      if (peopleData.length === 0) {
        fetchPeopleData();
      }
    }
  }, [activeMenu, peopleData, fetchPeopleData]);

  const RenderContent = () => {
    switch (activeMenu) {
      case "1":
        return <div className="content-main">Content for Company</div>;
      case "2":
        return (
          <People
            setActiveMenu={setActiveMenu}
            peopleData={peopleData}
            setPeopleData={setPeopleData}
          />
        );
      case "3":
        return <div className="content-main">Content for Violations</div>;
      case "4":
        return <div className="content-main">Content for Statistics</div>;
      case "5":
        return (
          <People
            isEditable
            setActiveMenu={setActiveMenu}
            peopleData={peopleData}
            setPeopleData={setPeopleData}
          />
        );
      case "6": {
        const username = JSON.parse(
          localStorage.getItem("userDetails")
        )?.username;
        return <div className="content-main">User: {username}</div>;
      }
      case "7":
        return <div className="content-main">Content for Logout</div>;
      default:
        return <div className="content-main">Select a menu item</div>;
    }
  };

  const peopleCount = useMemo(() => {
    const sum = Object.values(peopleData).reduce(
      (acc, value) => acc + value,
      0
    );
    return sum;
  }, [peopleData]);

  const leftMenuItems = [
    { key: "1", label: "Company" },
    {
      key: "2",
      label: (
        <Badge count={peopleCount} overflowCount={10000} offset={[16, 0]}>
          <div className="tabs">People</div>
        </Badge>
      ),
    },
    {
      key: "3",
      label: (
        <Badge count={50} offset={[16, 0]}>
          <div className="tabs">Violations</div>
        </Badge>
      ),
    },
    { key: "4", label: "Statistics" },
    { key: "5", label: "Settings" },
  ];

  const rightMenuItems = [
    { key: "6", label: "Profile" },
    { key: "7", label: "Logout", onClick: onLogout },
  ];

  return (
    <Layout className="main-layout">
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
            items={leftMenuItems}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            className="right-menu"
            onClick={handleMenuClick}
            selectedKeys={
              activeMenu && ["6", "7"].includes(activeMenu) ? [activeMenu] : []
            }
            items={rightMenuItems}
          />
        </div>
      </Header>
      <Layout className="content-container">
        <Content className="content">
          {loading ? (
            <Spin size="large" className="loading" />
          ) : (
            <RenderContent />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
