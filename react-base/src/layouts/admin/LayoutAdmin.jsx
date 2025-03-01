import React, { useState } from "react";
import {
  CalendarTwoTone,
  ClockCircleTwoTone,
  ContactsTwoTone,
  DollarTwoTone,
  FireTwoTone,
  IdcardTwoTone,
  LikeTwoTone,
  PictureTwoTone,
  PieChartTwoTone,
  PlaySquareTwoTone,
  PlusOutlined,
  TagTwoTone,
  UnorderedListOutlined,
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
  getItem(<Link to="/admin/movies">Phim</Link>, "2", <PlaySquareTwoTone />),
  getItem(
    <Link to="/admin/genres">Thể loại</Link>,
    "13",
    <PlaySquareTwoTone />
  ),
  getItem(" Rạp phim", "3", <VideoCameraTwoTone />),
  getItem(" Lịch chiếu", "4", <CalendarTwoTone />),
  getItem(" Suất chiếu", "5", <ClockCircleTwoTone />),
  getItem(" Giá vé", "6", <DollarTwoTone />),
  getItem(" Vé", "7", <TagTwoTone />),
  getItem(<Link to="/admin/promocodes">Khuyến mãi</Link>, "8", <FireTwoTone />),
  getItem(" Combo", "9", <LikeTwoTone />),
  getItem(" Bài viết", "10", <PictureTwoTone />, [
    getItem(
      <Link to="/admin/products">Tất cả bài viết</Link>,
      "10.1",
      <UnorderedListOutlined />
    ),
    getItem(
      <Link to="/admin/products/add">Bài viết của tôi</Link>,
      "10.2",
      <PlusOutlined />
    ),
    getItem(
      <Link to="/admin/products/add">Tạo bài viết</Link>,
      "10.3",
      <PlusOutlined />
    ),
  ]),
  getItem(" Người dùng", "11", <IdcardTwoTone />),
  // getItem(" Diễn viên", "12", <ContactsTwoTone />),
  getItem(<Link to="/admin/actors">Diễn viên</Link>, "12", <ContactsTwoTone />),
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
