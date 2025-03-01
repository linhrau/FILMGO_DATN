import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const ListRoom = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://filmgo.io.vn/api/screens/delete/${id}`);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Bạn đã xoá phòng chiếu thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Xoá rạp phim thất bại, vui lòng thử lại sau",
      });
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ["screens"],
    queryFn: async () => {
      const response = await axios.get(`http://filmgo.io.vn/api/screens`);
      return response.data.data.map((screen) => ({
        ...screen,
        key: screen.id,
      }));
    },
  });

  const columns = [
    {
      title: "Tên phòng chiếu",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "",
      key: "action",
      render: (_, screen) => (
        <Space>
          <Popconfirm
            title="Bạn có chắc muốn xoá phim này?"
            onConfirm={() => mutate(screen.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
          <Link to={`/admin/update-screen/${screen.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <center>
        <h1 className="text-3xl mb-5">Quản lý phòng chiếu</h1>
      </center>
      <Link to="/admin/creat-screen" className="btn btn-primary">
        Thêm phòng chiếu
      </Link>
      <br />
      <br />
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </>
  );
};

export default ListRoom;
