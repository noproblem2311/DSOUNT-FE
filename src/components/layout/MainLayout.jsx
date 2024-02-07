import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { SignedOut, SignedIn, SignInButton, SignOutButton } from '@clerk/clerk-react';

function getItem(label, key, icon = null, children = null) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const clerkItems = [
  getItem(
    <SignedOut>
      <div>
        <SignInButton>Đăng nhập</SignInButton>
        <p>This content is public. Only signed out users can see the SignInButton above this text.</p>
      </div>
    </SignedOut>,
    'signIn',
    <MailOutlined />
  ),
  getItem(
    <SignedIn>
      <div>
        <SignOutButton >Đăng xuất</SignOutButton>
        <p>This content is private. Only signed in users can see the SignOutButton above this text.</p>
      </div>
    </SignedIn>,
    'signOut',
    <AppstoreOutlined />
  ),
];

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ]),
  ...clerkItems,
];

// Thêm tham số `children` vào component
const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 256, height: 500}}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      {/* Vùng để render children */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
