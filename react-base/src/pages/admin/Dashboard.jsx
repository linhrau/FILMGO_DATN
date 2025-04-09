import { useQuery } from "@tanstack/react-query";
import { Skeleton, Table, Card, Row, Col, Statistic, DatePicker } from "antd";
import moment from "moment";
import axios from "axios";
import { useState } from "react";

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

  // Tính toán doanh thu tổng
  const totalRevenue = data?.reduce(
    (acc, ticket) =>
      acc + parseFloat(ticket.total_amount.replace(".", "").replace(",", ".")),
    0
  );

  // Tính toán doanh thu theo tháng
  const revenueByMonth = data?.reduce((acc, ticket) => {
    const monthYear = moment(ticket.created_at).format("MM/YYYY"); // Lấy tháng và năm
    const revenue = parseFloat(
      ticket.total_amount.replace(".", "").replace(",", ".")
    );

    if (acc[monthYear]) {
      acc[monthYear] += revenue; // Cộng doanh thu vào tháng đó
    } else {
      acc[monthYear] = revenue; // Khởi tạo doanh thu cho tháng đó
    }
    return acc;
  }, {});

  // const monthlyRevenueData = Object.keys(revenueByMonth).map((month) => ({
  //   month,
  //   revenue: revenueByMonth[month],
  // }));

  // State for the selected month
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Handle month selection
  const handleMonthChange = (date) => {
    if (date) {
      const monthYear = date.format("MM/YYYY");
      setSelectedMonth(monthYear);
    }
  };

  // Filter the data based on selected month
  const filteredRevenue = selectedMonth
    ? revenueByMonth[selectedMonth] || 0
    : totalRevenue;

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
      title: "Ngày mua",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <a>{moment(text).format("DD/MM/YYYY ")}</a>,
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
      <h1 className="text-3xl mb-5">Thống kê</h1>

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

        {/* Thống kê doanh thu theo tháng */}
        <Col span={12}>
          <Card>
            <Row align="middle">
              {/* DatePicker for selecting month */}
              <Col span={12}>
                <DatePicker
                  picker="month"
                  onChange={handleMonthChange}
                  format="MM/YYYY"
                  placeholder="Chọn tháng"
                  style={{ width: "100%" }}
                />
              </Col>
              {/* Statistic for Monthly Revenue */}
              <Col span={12} style={{ textAlign: "right" }}>
                <Statistic
                  title={`Doanh thu tháng ${selectedMonth || "Tất cả"}`}
                  value={filteredRevenue}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  prefix="₫"
                  suffix="VND"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Bảng hiển thị thông tin vé
      <Skeleton active loading={isLoading}>
        <Table columns={columns} dataSource={data} />
      </Skeleton> */}
    </>
  );
};

export default Dashboard;
