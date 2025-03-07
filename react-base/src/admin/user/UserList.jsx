import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import axios from "axios";

const USerList = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`http://filmgo.io.vn/api/users`);
      return response.data.data.map((user) => ({
        key: user.id,
        ...user,
      }));
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`http://filmgo.io.vn/api/users/delete/${id}`);
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
            {/* <Link to={`/admin/update-user/${item.id}`}>
              <Button variant="solid" color="primary">
                Cập nhật
              </Button>
            </Link> */}
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
export default USerList;

/**
 * Xóa người dùng:
 * Bước 1: Click vào button, lấy được id người dùng
 * Bước 2: Hiển thị confirm xác nhận xóa người dùng
 * Bước 3: Sử dụng useMutation để gọi API xóa người dùng dựa trên id vừa có
 * Bước 4: Nếu thành công thì hiển thị message, ngược lại hiển thị message lỗi
 * Bước 5: Cập nhật lại (refetching) danh sách người dùng
 */
