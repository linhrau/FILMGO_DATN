import React, { useState } from "react";
import {
  BankTwoTone,
  CalendarTwoTone,
  ClockCircleTwoTone,
  ContactsTwoTone,
  DollarTwoTone,
  FireTwoTone,
  GiftTwoTone,
  IdcardTwoTone,
  LikeTwoTone,
  PictureTwoTone,
  PieChartTwoTone,
  PlaySquareTwoTone,
  PlusOutlined,
  ProjectTwoTone,
  TagTwoTone,
  UnorderedListOutlined,
  UserOutlined,
  VideoCameraTwoTone,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/admin">Thống kê</Link>, "1", <PieChartTwoTone />),
  getItem(
    <Link to="/admin/list-movies">Phim</Link>,
    "2",
    <PlaySquareTwoTone />
  ),

  getItem(
    <Link to="/admin/list-cinema">Rạp phim</Link>,
    "3",
    <VideoCameraTwoTone />
  ),
  getItem(
    <Link to="/admin/list-province">Khu vực</Link>,
    "15",
    <BankTwoTone />
  ),
  getItem(
    <Link to="/admin/list-screen">Phòng chiếu</Link>,
    "14",
    <ProjectTwoTone />
  ),

  getItem(" Lịch chiếu", "4", <CalendarTwoTone />),

  getItem(
    <Link to="/admin/list-showtime">Suất chiếu</Link>,
    "5",
    <ClockCircleTwoTone />
  ),
  getItem(<Link to="/admin/seats">Ghế</Link>, "16", <UserOutlined />),
  getItem(" Vé", "7", <TagTwoTone />),
  getItem(<Link to="/admin/list-promo">Khuyến mãi</Link>, "8", <FireTwoTone />),
  getItem(<Link to="/admin/list-product">Combo</Link>, "9", <GiftTwoTone />),
  // getItem(<Link to="/admin/list-banners">Banners</Link>, "10", <LikeTwoTone />),
  getItem(
    <Link to="/admin/list-user">Người dùng</Link>,
    "11",
    <IdcardTwoTone />
  ),
  getItem(
    <Link to="/admin/list-actors">Diễn viên</Link>,
    "12",
    <ContactsTwoTone />
  ),
  getItem(
    <Link to="/admin/list-genres">Thể loại</Link>,
    "13",
    <PlaySquareTwoTone />
  ),
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {/* <Breadcrumb.Item>User</Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
