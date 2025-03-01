import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const { Option } = Select;

const UpdateCinema = () => {
  const nav = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL
  const [provinces, setProvinces] = useState([]);
  const [cinemaData, setCinemaData] = useState(null); // State để lưu dữ liệu rạp phim cần cập nhật

  useEffect(() => {
    axios
      .get("http://filmgo.io.vn/api/provinces")
      .then((res) => setProvinces(res.data.data)); //cập nhập giá trị của province sau khi nhân dữ liệu
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://filmgo.io.vn/api/cinemas/show/${id}`).then((res) => {
        setCinemaData(res.data.data); // Lưu dữ liệu rạp phim vào state
      });
    }
  }, [id]);

  const { mutate } = useMutation({
    mutationFn: async (cinema) => {
      await axios.put(`http://filmgo.io.vn/api/cinemas/update/${id}`, cinema); // Sử dụng PUT để cập nhật
    },
    onSuccess: () => {
      nav(`/admin/list-cinema`);
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  if (!cinemaData && id) return <div>Loading...</div>; // Hiển thị loading nếu đang tải dữ liệu

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={cinemaData || {}} // Sử dụng dữ liệu rạp phim làm initialValues
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1 className="text-3xl mb-5">Cập nhật rạp phim</h1>
      <Form.Item
        label="Tên rạp"
        name="name"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống!",
          },
        ]}
      >
        <Input placeholder="Nhập tên rạp" />
      </Form.Item>
      <Form.Item
        label="Mã rạp"
        name="code"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống!",
          },
        ]}
      >
        <Input placeholder="Nhập mã rạp" />
      </Form.Item>
      <Form.Item
        name="province_id"
        label="Khu vực"
        rules={[{ required: true, message: "Vui lòng Không bỏ trống" }]}
      >
        <Select placeholder="Chọn khu vực loại">
          {provinces.map((province) => (
            <Option key={province.id} value={province.id}>
              {province.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Nhập địa chỉ"
        name="address"
        rules={[
          {
            required: true,
            message: "Bắt buộc nhập",
          },
        ]}
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>

      <Form.Item
        label="Nhập số điện thoại"
        name="contact"
        rules={[
          {
            required: true,
            message: "Bắt buộc nhập",
          },
        ]}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default UpdateCinema;
