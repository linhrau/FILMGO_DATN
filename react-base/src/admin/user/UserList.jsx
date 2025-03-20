import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import axios from "axios";

const UserList = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  // Lấy token từ localStorage
  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = getAccessToken();

      // Kiểm tra token có hợp lệ không
      if (!token) {
        throw new Error("Token không hợp lệ hoặc không tồn tại");
      }

      // Thêm token vào header của yêu cầu
      const response = await axios.get(`http://filmgo.io.vn/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      return response.data.data.map((user) => ({
        key: user.id,
        ...user,
      }));
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const token = getAccessToken();
      if (!token) {
        throw new Error("Token không hợp lệ hoặc không tồn tại");
      }

      return await axios.delete(`http://filmgo.io.vn/api/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      messageApi.success("Xóa người dùng thành công");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      messageApi.error("Xóa người dùng không thành công", error.message);
    },
  });

  const onHandleRemove = (id) => {
    mutate(id);
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role",
    },
    {
      key: "action",
      render: (_, item) => (
        <div className="w-20">
          <Space width="150">
            <Popconfirm
              title="Xóa người dùng"
              description="Bạn có chắc chắn muốn xóa người dùng này không?"
              onConfirm={() => onHandleRemove(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button variant="solid" color="danger">
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <h1 className="text-3xl mb-5">Quản lý người dùng</h1>
      <Skeleton active loading={isLoading}>
        <Table columns={columns} dataSource={data} />
      </Skeleton>
    </>
  );
};

export default UserList;
