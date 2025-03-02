import { Button, message, Popconfirm, Skeleton, Space, Table, Tag } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PromoCodeList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://filmgo.io.vn/api/promocodes/delete/${id}`);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Bạn đã xoá mã khuyến mãi thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["promocodes"] });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Xoá mã khuyến mãi thất bại, vui lòng thử lại sau",
      });
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ["promocodes"],
    queryFn: async () => {
      const response = await axios.get(`http://filmgo.io.vn/api/promocodes`);
      return response.data.data.map((promocode) => ({
        ...promocode,
        key: promocode.id,
      }));
    },
  });

  const columns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Phần trăm giảm giá ",
      dataIndex: "discount_amount",
      key: "discount_amount",
    },
    {
        title: "Trạng thái ",
        dataIndex: "status",
        key: "status",
        render: (_, item) => {
            return item.status ? (
              <Tag color="green">Online</Tag>
            ) : (
              <Tag color="red">Offline</Tag>
            );
          },
    },
    {
        title: "Thời gian bắt đầu ",
        dataIndex: "start_date",
        key: "start_date",
    },
    {
        title: "Thời gian kết thúc ",
        dataIndex: "end_date",
        key: "end_date",
    },
   
    {
      title: "",
      key: "action",
      render: (_, promocode) => (
        <Space>
          <Popconfirm
            title="Bạn có chắc muốn xoá phim này?"
            onConfirm={() => mutate(promocode.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
          <Link to={`/admin/promocodes/update/${promocode.id}`}>
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
        <h1 className="text-3xl mb-5">Quản lý mã khuyến mãi</h1>
      </center>
      <Link to="/admin/promocodes/add" className="btn btn-primary">
        Thêm mã khuyến mãi
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

export default PromoCodeList;