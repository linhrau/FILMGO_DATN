import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, InputNumber, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const API_GET_PRODUCT = "http://filmgo.io.vn/api/products/show/";
const API_UPDATE_PRODUCT = "http://filmgo.io.vn/api/products/update/";

const UpdateProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching: ${API_GET_PRODUCT}${id}`); // Kiểm tra URL API
        const response = await fetch(`${API_GET_PRODUCT}${id}`);
        const data = await response.json();
        console.log("API Response:", data); // Kiểm tra dữ liệu trả về
  
        if (response.ok && data) {
          setProduct(data);
          form.setFieldsValue({
            code: data.code || "",
            name: data.name || "",
            price: data.price || "",
            status:""
          });
        } else {
          message.error("Không tìm thấy sản phẩm!");
          nav("/admin/products");
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        message.error("Không thể tải dữ liệu sản phẩm!");
      }
    };
    fetchProduct();
  }, [id, form, nav]);
  

  // Xử lý upload ảnh
  const beforeUpload = (file) => {
    const isValid = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
    if (!isValid) {
      message.error("Chỉ chấp nhận file JPG, JPEG hoặc PNG!");
      return false;
    }
    setFile(file);
    return false;
  };

  // Xử lý cập nhật sản phẩm
  const handleSubmit = async (values) => {
    console.log("Form values:", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("code", values.code);
    formData.append("price", values.price);
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      const response = await fetch(`${API_UPDATE_PRODUCT}${id}`, {
        method: "POST", // Dùng PATCH để cập nhật từng phần
        body: formData,
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        message.success("Cập nhật thành công!");
        nav("/admin/products");
      } else {
        message.error(result.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      message.error("Lỗi kết nối API!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <center>
        <h1 className="text-3xl mb-5">Cập Nhật Combo</h1>
      </center>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Mã sản phẩm */}
        <Form.Item label="Mã" name="code" rules={[{ required: true, message: "Vui lòng nhập mã!" }]}>
          <Input placeholder="Nhập mã" />
        </Form.Item>

        {/* Tên combo */}
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

        {/* Ảnh hiện tại */}
        {product?.image && (
          <Form.Item label="Ảnh hiện tại">
            <Image width={150} src={product.image} alt="Ảnh sản phẩm" />
          </Form.Item>
        )}

        {/* Upload ảnh mới */}
        <Form.Item label="Ảnh combo (JPG, PNG)" name="image">
          <Upload beforeUpload={beforeUpload} maxCount={1} accept=".jpg,.jpeg,.png" listType="picture">
            <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
          </Upload>
        </Form.Item>

        {/* Giá combo */}
        <Form.Item label="Giá combo" name="price" rules={[{ required: true, message: "Vui lòng nhập giá combo!" }]}>
          <InputNumber min={1} placeholder="Nhập giá combo" style={{ width: "100%" }} />
        </Form.Item>

        {/* Nút cập nhật */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật combo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
