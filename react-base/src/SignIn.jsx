import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Card, Col } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(`http://localhost:3000/api/signin`, formData);
    },
    onSuccess: () => {
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công!",
      });
      nav(`/`);
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card
        title="ĐĂNG NHẬP"
        bordered={false}
        style={{
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "30px 40px",
          textAlign: "center",
        }}
      >
        <Form
          name="signin-form"
          form={form}
          labelAlign="top"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          disabled={isPending}
        >
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Bắt buộc nhập",
                },
                {
                  type: "email",
                  message: "Định dạng email không đúng",
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Bắt buộc nhập",
                },
                {
                  min: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          </Col>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                borderRadius: "8px",
                fontWeight: "bold",
                padding: "12px 0",
                transition: "all 0.3s ease",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#40a9ff")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1890ff")}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
