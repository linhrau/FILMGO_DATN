import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const ListCinema = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://filmgo.io.vn/api/cinemas/delete/${id}`);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Bạn đã xoá rạp phim thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["cinemas"] });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Xoá rạp phim thất bại, vui lòng thử lại sau",
      });
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ["cinemas"],
    queryFn: async () => {
      const response = await axios.get(`http://filmgo.io.vn/api/cinemas`);
      return response.data.data.map((cinema) => ({
        ...cinema,
        key: cinema.id,
      }));
    },
  });

  const columns = [
    {
      title: "Tên rạp",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Liên hệ",
      dataIndex: "contact",
      key: "contact",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "",
      key: "action",
      render: (_, cinema) => (
        <Space>
          <Popconfirm
            title="Bạn có chắc muốn xoá phim này?"
            onConfirm={() => mutate(cinema.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
          <Link to={`/admin/update-cinema/${cinema.id}`}>
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
        <h1 className="text-3xl mb-5">Quản lý rạp phim</h1>
      </center>
      <Link to="/admin/creat-cinema" className="btn btn-primary">
        Thêm rạp phim
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

export default ListCinema;
