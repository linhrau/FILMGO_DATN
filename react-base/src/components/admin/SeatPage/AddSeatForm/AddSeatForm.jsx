import { Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddSeatForm() {
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (cinema) => {
      await axios.post(`http://localhost:3000/cinemas`, cinema);
    },
    onSuccess: () => {
      nav(`/admin/list-cinema`);
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div className="">
      <Form className="m-auto"
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
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Hàng ghế"
          name="row"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
        >
          <Input placeholder="Số hàng ghế" />
        </Form.Item>
        <Form.Item
          label="Số lượng ghế"
          name="number"
          rules={[
            {
              required: true,
              message: "Bắt buộc nhập",
            },
          ]}
        >
          <Input placeholder="Nhập số lượng ghế" type="number" />
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
    </div>
  );
}

export default AddSeatForm;
