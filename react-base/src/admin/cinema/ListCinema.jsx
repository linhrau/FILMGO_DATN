import {
  Button,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Table,
  Select,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const ListCinema = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const [selectedProvince, setSelectedProvince] = useState(null); // State để lưu khu vực đã chọn

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

  // Lọc dữ liệu theo province_id
  const filteredData = selectedProvince
    ? data?.filter((cinema) => cinema.province_id === selectedProvince)
    : data;

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

  // Lấy danh sách các khu vực để tạo dropdown (Select)
  const provinceOptions = Array.from(
    new Set(data?.map((cinema) => cinema.province_id)) // Tạo danh sách khu vực duy nhất
  ).map((province) => ({
    value: province,
    label: `Khu vực ${province}`, // Tùy chỉnh tên khu vực nếu cần
  }));

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

      {/* Dropdown lọc khu vực */}
      <div style={{ marginBottom: "20px" }}>
        <Select
          placeholder="Chọn khu vực"
          style={{ width: 200 }}
          onChange={(value) => setSelectedProvince(value)}
          allowClear
        >
          {provinceOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>

      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData} // Hiển thị dữ liệu đã lọc
          rowKey="key"
          pagination={false}
        />
      )}
    </>
  );
};

export default ListCinema;
