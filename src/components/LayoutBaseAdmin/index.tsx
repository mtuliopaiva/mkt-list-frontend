import React, { useState } from "react";
import { Avatar, Button, Layout, Menu, Popconfirm, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  SettingOutlined,
  SkinOutlined,
  UserOutlined,
  PoweroffOutlined,
  PieChartOutlined,
ShoppingCartOutlined,
TagsOutlined,
UnorderedListOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import ImgComponent from "../Img";
import ProfileImage from "../../../public/profile-image.png";

const { Header, Content } = Layout;

const LayoutBaseAdmin = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("1");

  const handleLogout = () => {
    console.log("Logout confirmado");
    navigate("/");
  };

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const handleSelectMenuItem = (e: any) => {
    setCurrent(e.key);
    const selectedItem = menuItems.find((item) => item.key === e.key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
    }
  };

  const menuItems = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      key: "2",
      icon: <ShoppingCartOutlined />,
      label: "Products",
      path: "/admin/products",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Clients",
      path: "/admin/clients",
    },
    {
      key: "4",
      icon: <TagsOutlined />,
      label: "Categories",
      path: "/admin/settings",
    },
    {
      key: "5",
      icon: <UnorderedListOutlined />,
      label: "Lists",
      path: "/admin/settings",
    },
    {
      key: "6",
      icon: <SettingOutlined />,
      label: "Settings",
      path: "/admin/settings",
    },
    {
      key: "7",
      icon: <PoweroffOutlined />,
      label: (
        <Popconfirm
          title="Tem certeza que deseja sair?"
          onConfirm={handleLogout}
          okText="Sim"
          cancelText="Não"
        >
          <span>Logout</span>
        </Popconfirm>
      ),
    },
  ];

  const profileMenuItems = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <Popconfirm
          title="Tem certeza que deseja sair?"
          onConfirm={handleLogout}
          okText="Sim"
          cancelText="Não"
        >
          <span>Logout</span>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Layout className="h-screen w-full">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#F3F4F6" }}
      >
        <div>
          <ImgComponent
            src={"Logo"}
            alt="Logotipo da Thrift Shop"
            className="custom-class p-8"
          />
        </div>

        <Menu
          style={{ backgroundColor: "#F3F4F6" }}
          mode="inline"
          selectedKeys={[current]}
          onClick={handleSelectMenuItem}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>
      <Layout className="w-full h-full">
        <Header className="flex items-center justify-between p-0 bg-gray-100 w-full">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleToggleCollapse}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
          </div>

          <div className="flex-grow"></div>
          <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight">
            <div className="flex items-center justify-end space-x-4 mr-4 cursor-pointer">
              <Avatar
                src={"ProfileImage"}
                style={{ border: "1px solid #B2F6E9" }}
              />
              <p className="m-0">Admin</p>
            </div>
          </Dropdown>
        </Header>

        <Content className="w-full h-full p-8 bg-[#fff]">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutBaseAdmin;
