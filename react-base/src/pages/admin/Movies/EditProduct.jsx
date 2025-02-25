// import React from "react";

// const EditProduct = () => {
//   return <div>EditProduct</div>;
// };

// export default EditProduct;
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Switch,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const EditProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const nav = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      return res.data;
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (product) => {
      await axios.put(`http://localhost:3000/products/${id}`, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      if (confirm(" Are you sure")) {
        nav("/admin/products");
      }
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
    mutate({ ...values, imageUrl });
  };
  return (
    <div>
      <Skeleton loading={isLoading}>
        <Form onFinish={onFinish} initialValues={data}>
          <Form.Item
            label="ten san pham"
            name="name"
            rules={[
              {
                required: true,
                message: "Khong duoc bo trong",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Anh san pham"
            name="imageUrl"
            rules={[
              {
                required: true,
                message: "Khong duoc bo trong",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
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
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item label="Tinh trang" name="available" initialValue={false}>
            <Switch />
          </Form.Item>

          <Form.Item
            label="Danh muc"
            name="category"
            rules={[
              {
                required: true,
                message: "Khong duoc bo trong",
              },
            ]}
          >
            <Select>
              <Select.Option value="Tình cảm">Tình cảm</Select.Option>
              <Select.Option value="Phiêu lưu">Phiêu lưu </Select.Option>
              <Select.Option value="Viễn tưởng">Viễn tưởng</Select.Option>
              <Select.Option value="Kinh dị">Kinh dị</Select.Option>
              <Select.Option value="Hài">Hài</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </div>
  );
};

export default EditProduct;
