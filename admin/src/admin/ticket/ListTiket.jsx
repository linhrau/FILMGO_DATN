import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const ListTiket = () => {
  // Lấy token từ localStorage
  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["tickets"],
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
        ...ticket,
        key: ticket.id,
      }));
    },
  });

  const columns = [
    {
      title: "Mã vé",
      dataIndex: "ticket_id",
      key: "ticket_id",
    },
    {
      title: "Code",
      dataIndex: "ticket_code",
      key: "ticket_code",
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
      title: "",

      key: "action",
      render: (_, ticket) => (
        <Space>
          <Link to={`/admin/detail-ticket/${ticket.ticket_id}`}>
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-3xl mb-5">Quản lý vé</h1>
      <button className="btn btn-primary">
        <Link to="/admin/check-ticket">Quét mã barcode</Link>
      </button>
      <Skeleton active loading={isLoading}>
        <Table columns={columns} dataSource={data} />
      </Skeleton>
    </>
  );
};

export default ListTiket;
