import React, { useState } from "react";
import { Form, Input, Button, Upload, message, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const API_ADD_PRODUCT = "http://filmgo.io.vn/api/products/create";

const CreateProduct = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Kiểm tra file hợp lệ trước khi upload
  const beforeUpload = (file) => {
    const isValid =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isValid) {
      message.error("Chỉ chấp nhận file JPG, JPEG hoặc PNG!");
      return false;
    }
    setFile(file); // Lưu file vào state
    return false; // Chặn upload tự động
  };

  // Xử lý khi gửi form
  const handleSubmit = async (values) => {
    console.log("Form values:", values);

    if (!file) {
      message.error("Vui lòng chọn ảnh hợp lệ!");
      return;
    }

    const price = Number(values.price);
    if (isNaN(price) || price <= 0) {
      message.error("Giá combo phải là một số dương!");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", file); // Đảm bảo gửi file đúng
    formData.append("code", values.code);
    formData.append("price", String(price)); // Gửi giá dưới dạng chuỗi

    try {
      setLoading(true);
      const response = await fetch(API_ADD_PRODUCT, {
        method: "POST",
        body: formData, // Không cần headers
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        message.success("Thêm combo thành công!");
        form.resetFields();
        setFile(null);
        nav("/admin/products");
      } else {
        console.error("Validation Errors:", result.errors);
        message.error(result.message || "Thêm thất bại!");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      message.error("Lỗi kết nối API!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <center>
        <h1 className="text-3xl mb-5">Thêm Combo</h1>
      </center>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Mã"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
        >
          <Input placeholder="Nhập mã" />
        </Form.Item>

        <Form.Item
            label="Combo"
            name="name"
            rules={[
                { required: true, message: "Vui lòng nhập tên combo!" },
                { min: 5, message: "Tên combo phải có ít nhất 5 ký tự!" }
            ]}
            >
            <Input placeholder="Nhập tên combo" />
        </Form.Item>


        <Form.Item
          label="Ảnh combo (JPG, PNG)"
          name="image"
          rules={[{ required: true, message: "Vui lòng tải lên ảnh!" }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            maxCount={1}
            accept=".jpg,.jpeg,.png"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Giá combo"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá combo!" }]}
        >
          <InputNumber min={1} placeholder="Nhập giá combo" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm combo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
