import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const ListTiket = () => {
  //   const queryClient = useQueryClient();
  //   const [messageApi, contextHolder] = message.useMessage();

  // Lấy token từ localStorage
  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

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

      return response.data.data.map((tiket) => ({
        key: tiket.id,
        ...tiket,
      }));
    },
  });

  const columns = [
    {
      title: "Mã vé",
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
      render: (_, province) => (
        <Space>
          <Link to={`/admin/update-province/${province.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* {contextHolder} */}
      <h1 className="text-3xl mb-5">Quản lý vé</h1>
      <Skeleton active loading={isLoading}>
        <Table columns={columns} dataSource={data} />
      </Skeleton>
    </>
  );
};

export default ListTiket;
