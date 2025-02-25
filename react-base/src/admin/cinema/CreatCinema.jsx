import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatCinema = () => {
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
    <Form
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
        label="Tên rạp"
        name="name"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống!",
          },
        ]}
      >
        <Input placeholder="Nhập tên rạp" />
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

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreatCinema;
