import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatProvince = () => {
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (province) => {
      await axios.post(`http://filmgo.io.vn/api/provinces/create`, province);
    },
    onSuccess: () => {
      nav(`/admin/list-province`);
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
        label="Khu vực"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your province!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreatProvince;
