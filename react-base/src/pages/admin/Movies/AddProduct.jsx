import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  DatePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (product) => {
      await axios.post("http://localhost:3000/products", product);
    },
    onSuccess: () => {
      navigate("/admin/products");
    },
  });

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onUploadChange = (info) => {
    if (info.file.status == "done") {
      setImageUrl(info.file.response.secure_url);
    }
  };

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      imageUrl,
      releaseDate: values.releaseDate
        ? values.releaseDate.format("YYYY-MM-DD")
        : null,
      createdAt: new Date().toISOString().split("T")[0], // Chỉ lấy phần YYYY-MM-DD
    };
    console.log("Dữ liệu gửi đi:", formattedValues); // Debug xem có chuẩn không
    mutate(formattedValues);
  };

  return (
    <div>
      <h1 className="text-4xl my-8">Thêm mới sản phẩm</h1>
      <Form
        name="add-form"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://api.cloudinary.com/v1_1/dxhgeg7vi/image/upload"
            listType="picture-card"
            data={{ upload_preset: "upload-demo" }}
            onChange={onUploadChange}
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Năm"
          name="year"
          rules={[{ required: true, message: "Vui lòng nhập năm phát hành" }]}
        >
          <InputNumber
            min={1900}
            max={new Date().getFullYear()}
            placeholder="Nhập năm phát hành"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Thể loại" name="category">
          <Select>
            <Select.Option value="Tình cảm">Tình cảm</Select.Option>
            <Select.Option value="Phiêu lưu">Phiêu lưu</Select.Option>
            <Select.Option value="Viễn tưởng">Viễn tưởng</Select.Option>
            <Select.Option value="Kinh dị">Kinh dị</Select.Option>
            <Select.Option value="Hài">Hài</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Trạng thái" name="available" initialValue={false}>
          <Switch />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Lịch chiếu"
          name="releaseDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày chiếu" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
