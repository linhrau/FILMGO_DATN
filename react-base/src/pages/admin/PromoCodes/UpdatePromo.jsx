import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Switch,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Lấy access token từ localStorage
const token = localStorage.getItem("access_token");

// Cấu hình axiosInstance với token
const axiosInstance = axios.create({
  baseURL: "http://filmgo.io.vn/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const PromoCodeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu mã khuyến mãi từ API
  useEffect(() => {
    axiosInstance
      .get(`/promocodes/show/${id}`)
      .then((response) => {
        const data = response.data.data;
        form.setFieldsValue({
          code: data.code,
          description: data.description,
          discount_amount: data.discount_amount,
          start_date: dayjs(data.start_date),
          end_date: dayjs(data.end_date),
          status: data.status === "active",
        });
      })
      .catch(() => {
        message.error("Không thể tải dữ liệu mã khuyến mãi");
        navigate("/admin/promocodes");
      });
  }, [id, form, navigate]);

  // Xử lý cập nhật dữ liệu
  const handleUpdate = (values) => {
    setLoading(true);

    const updatedData = {
      ...values,
      status: values.status ? "active" : "inactive",
      start_date: values.start_date.format("YYYY-MM-DD"),
      end_date: values.end_date.format("YYYY-MM-DD"),
    };

    axiosInstance
      .put(`/promocodes/update/${id}`, updatedData)
      .then(() => {
        message.success("Cập nhật mã khuyến mãi thành công!");
        navigate("/admin/list-promo");
      })
      .catch(() => {
        message.error("Cập nhật thất bại, vui lòng thử lại!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">Chỉnh sửa mã khuyến mãi</h1>

      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item label="Mã khuyến mãi" name="code">
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Giá trị giảm"
          name="discount_amount"
          rules={[{ required: true, message: "Vui lòng nhập giá trị giảm!" }]}
        >
          <InputNumber min={1} max={100} addonAfter="%" />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        <Form.Item
          label="Ngày bắt đầu"
          name="start_date"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="end_date"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PromoCodeEdit;
