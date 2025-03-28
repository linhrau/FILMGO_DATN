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
import React, { useState } from "react";
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
  getItem(<Link to="/admin/list-movie">Phim</Link>, "2", <PlaySquareTwoTone />),
  getItem(<Link to="/admin/list-cinema">Rạp phim</Link>, "3", <VideoCameraTwoTone />),
  getItem(<Link to="/admin/list-screen">Phòng chiếu</Link>, "4", <CalendarTwoTone />),
  getItem(<Link to="/admin/list-showtime">Lịch chiếu</Link>, "5", <ClockCircleTwoTone />),
  getItem(<Link to="/admin/list-ticket">Vé</Link>, "6", <TagTwoTone />),
  getItem(<Link to="/admin/list-promocode">Khuyến mãi</Link>,"7",<FireTwoTone />),
  getItem(<Link to="/admin/list-product">Combo</Link>, "8", <LikeTwoTone />),
  getItem(" Bài viết", "9", <PictureTwoTone />, [
    getItem(
      <Link to="/admin/products">Tất cả bài viết</Link>,
      "9.1",
      <UnorderedListOutlined />
    ),
    getItem(
      <Link to="/admin/products/add">Bài viết của tôi</Link>,
      "9.2",
      <PlusOutlined />
    ),
    getItem(
      <Link to="/admin/products/add">Tạo bài viết</Link>,
      "9.3",
      <PlusOutlined />
    ),
  ]),
  getItem(" Người dùng", "10", <IdcardTwoTone />),
  getItem(" Nhân viên", "11", <ContactsTwoTone />),
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
