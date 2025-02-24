import {
  Form,
  Input,
  Button,
  message,
  DatePicker,
  Card,
  Row,
  Col,
  Radio,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(`http://localhost:3000/api/signup`, formData);
    },
    onSuccess: () => {
      form.resetFields();
      localStorage.setItem(
        "user",
        JSON.stringify({ ...form.getFieldsValue() })
      );
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công!",
      });
      nav(`/signin`);
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  const validatePassword = (_, value) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card
        title="ĐĂNG KÝ TÀI KHOẢN"
        bordered={false}
        style={{
          width: 800,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Form
          className="signup-form"
          name="basic"
          form={form}
          labelAlign="top"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          disabled={isPending}
        >
          <Row gutter={32}>
            {/* Bên trái */}
            <Col span={12}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc nhập",
                  },
                ]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc nhập",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

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
                    min: 3,
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

              <Form.Item
                label="Nhập lại mật khẩu"
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc nhập",
                  },
                  {
                    validator: validatePassword,
                  },
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu" />
              </Form.Item>
            </Col>

            {/* Bên phải */}
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc chọn giới tính",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="male">Nam</Radio>
                  <Radio value="female">Nữ</Radio>
                  <Radio value="other">Khác</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="birthday" //date of birth
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc chọn ngày sinh",
                  },
                ]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Tỉnh/Thành phố"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc chọn tỉnh/thành phố",
                  },
                ]}
              >
                <Input placeholder="Nhập Tỉnh/Thành phố" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                borderRadius: "4px",
                fontWeight: "bold",
                padding: "12px 0",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#40a9ff")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1890ff")}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
