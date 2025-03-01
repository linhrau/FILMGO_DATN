import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const AddSeatForm = ({ screenId, setShowAddForm, refetchSeats }) => {
  const nav = useNavigate();
  const [form] = Form.useForm();

  const validateSeatType = (_, value) => {
    if (value && !["Ghế thường", "Ghế VIP", "Ghế đôi"].includes(value)) {
      return Promise.reject(
        "Kiểu ghế không hợp lệ. Chỉ được nhập Ghế thường, Ghế VIP hoặc Ghế đôi."
      );
    }
    return Promise.resolve();
  };

  const { mutate } = useMutation({
    mutationFn: async (seat) => {
      await axios.post(`http://filmgo.io.vn/api/seats/create`, seat, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    },
    onSuccess: () => {
      nav(`/admin/seats`);
      message.success("Thêm ghế thành công!"); // Hiển thị thông báo thành công
      refetchSeats();
      setShowAddForm(false); // Tắt model
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <Form
      form={form}
      className="m-auto"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 300,
      }}
      initialValues={{
        remember: true,
        screen_id: screenId,
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
            message: "Không được bỏ trống",
          },
        ]}
      >
        <Input placeholder="Nhập số lượng ghế" type="number" />
      </Form.Item>

      <Form.Item
        label="Kiểu ghế"
        name="type"
        rules={[
          { required: true, message: "Vui lòng nhập kiểu ghế" },
          { validator: validateSeatType },
        ]}
      >
        <Input placeholder="Ghế thường,VIP,đôi" />
      </Form.Item>

      <Form.Item
        label="Nhập giá ghế"
        name="price"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống",
          },
        ]}
      >
        <Input placeholder="Nhập giá" />
      </Form.Item>

      <Form.Item label="Phòng" name="screen_id" hidden>
        <Input placeholder={screenId} value={screenId} disabled />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

AddSeatForm.propTypes = {
  screenId: PropTypes.number.isRequired, // Thay 'array' bằng kiểu dữ liệu cụ thể nếu có thể
  setShowAddForm: PropTypes.func.isRequired,
  refetchSeats: PropTypes.func.isRequired,
};

export default AddSeatForm;
