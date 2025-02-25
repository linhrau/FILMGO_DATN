import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Image,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Table,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const ListCinema = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useQuery({
    queryKey: ["cinemas"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/cinemas`);
      return response.data.map((cinema) => ({
        key: cinema.id,
        ...cinema,
      }));
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`http://localhost:3000/cinemas/${id}`);
    },
    onSuccess: () => {
      messageApi.success("Xóa rạp thành công");
      queryClient.invalidateQueries({
        queryKey: ["cinemas"],
      });
    },
    onError: (error) => {
      messageApi.error("Xóa rạp dùng không thành công", error.message);
    },
  });
  const onHandleRemove = (id) => {
    mutate(id);
  };
  const columns = [
    // {
    //   title: "Ảnh đại diện",
    //   dataIndex: "avatar",
    //   key: "avatar",
    //   render: (_, item) => {
    //     return (
    //       <Space>
    //         <Image
    //           key={item.avatar}
    //           src={item.avatar}
    //           width={70}
    //           className="rounded border"
    //         />
    //       </Space>
    //     );
    //   },
    // },
    {
      title: "Tên rạp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Số phòng",
      dataIndex: "room",
      key: "room",
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
            <Link to={`/admin/update-cinema/${item.id}`}>
              <Button variant="solid" color="primary">
                Cập nhật
              </Button>
            </Link>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <h1 className="text-3xl mb-5">Quản lý rạp phim</h1>
      <Skeleton active loading={isLoading}>
        <Table columns={columns} dataSource={data} />
      </Skeleton>
    </>
  );
};
export default ListCinema;

/**
 * Xóa người dùng:
 * Bước 1: Click vào button, lấy được id người dùng
 * Bước 2: Hiển thị confirm xác nhận xóa người dùng
 * Bước 3: Sử dụng useMutation để gọi API xóa người dùng dựa trên id vừa có
 * Bước 4: Nếu thành công thì hiển thị message, ngược lại hiển thị message lỗi
 * Bước 5: Cập nhật lại (refetching) danh sách người dùng
 */
