import { Button, Form, Input, Skeleton } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpProvince = () => {
  const nav = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL

  const { data, isLoading } = useQuery({
    queryKey: ["provinces", id],
    queryFn: async () => {
      const response = await axios.get(
        `http://filmgo.io.vn/api/provinces/show/${id}`
      );
      return response.data.data;
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (province) => {
      await axios.put(
        `http://filmgo.io.vn/api/provinces/update/${id}`,
        province
      ); // Sử dụng PUT để cập nhật
    },
    onSuccess: () => {
      nav(`/admin/list-province`);
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };
  if (isLoading) return <Skeleton active />;
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
      initialValues={data} // Sử dụng dữ liệu rạp phim làm initialValues
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1 className="text-3xl mb-5">Cập nhật khu vực</h1>
      <Form.Item
        label="Tên Khu vực"
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

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default UpProvince;
