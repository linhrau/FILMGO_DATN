import { useQuery } from "@tanstack/react-query";
import { Skeleton, Table, Card, Row, Col, Statistic } from "antd";
import axios from "axios";

const Dashboard = () => {
  // Lấy token từ localStorage
  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  // Lấy dữ liệu từ API và tính toán doanh thu tổng
  const { data, isLoading } = useQuery({
    queryKey: ["tikets"],
    queryFn: async () => {
      const token = getAccessToken();

      // Kiểm tra token có hợp lệ không
      if (!token) {
        throw new Error("Token không hợp lệ hoặc không tồn tại");
      }

      // Thêm token vào header của yêu cầu
      const response = await axios.get(
        `http://filmgo.io.vn/api/admin/tickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      return response.data.data.map((ticket) => ({
        key: ticket.id,
        ...ticket,
      }));
    },
  });
  console.log(data);
  // Tính toán doanh thu tổng
  const totalRevenue = data?.reduce(
    (acc, ticket) =>
      acc + parseFloat(ticket.total_amount.replace(".", "").replace(",", ".")),
    0
  );

  // Cấu trúc bảng
  const columns = [
    {
      title: "Mã vé",
      dataIndex: "ticket_code",
      key: "ticket_code",
    },
    {
      title: "Mã vé",
      dataIndex: "ticket_id",
      key: "ticket_id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Tên phim",
      dataIndex: "movie_name",
      key: "movie_name",
    },
    {
      title: "Thời gian",
      dataIndex: "showtime",
      key: "showtime",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Đơn giá",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (text) => <span>{text.toLocaleString()} VNĐ</span>,
    },
  ];

  return (
    <>
      <h1 className="text-3xl mb-5">Quản lý vé</h1>

      {/* Thống kê tổng doanh thu */}
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Doanh thu Tổng"
              value={totalRevenue ? totalRevenue : 0}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix="₫"
              suffix="VND"
            />
          </Card>
        </Col>
      </Row>

      {/* Bảng hiển thị thông tin vé */}
      <Skeleton active loading={isLoading}>
        <Table columns={columns} dataSource={data} />
      </Skeleton>
    </>
  );
};

export default Dashboard;
