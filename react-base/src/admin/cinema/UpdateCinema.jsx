import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Skeleton } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCinema = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();
  const { id } = useParams(); //lấy dữ liệu của rạp từ data
  const { data, isLoading } = useQuery({
    queryKey: ["cinemas", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/cinemas/${id}`);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (cinema) => {
      return await axios.put(`http://localhost:3000/cinemas/${id}`, cinema);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật sản phẩm thành công!",
      });
      setTimeout(() => {
        nav("/admin/list-cinema"); // redirect về trang danh sách sản phẩm
      }, 2000);

      queryClient.invalidateQueries({
        queryKey: ["products", id],
      });
    },
    onError: (error) => {
      messageApi.error({
        type: "error",
        content: `Thêm sản phẩm thất bại, ${error}`,
      });
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };
  if (isLoading) return <Skeleton active />;

  return (
    <div>
      {contextHolder}

      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        initialValues={data}
        disabled={isPending}
      >
        <Form.Item
          label="Tên rạp"
          name="name"
          rules={[
            {
              required: true,
              message: "Bắt buộc nhập",
            },
          ]}
        >
          <Input />
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCinema;
