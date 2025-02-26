import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreatRoom = () => {
  const { cinemaId } = useParams();
  // const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (screen) => {
      await axios.post(
        `http://localhost:3000/cinemas/${cinemaId}/screens`,
        screen
      );
    },
    // onSuccess: () => {
    //   nav(`/admin/list-screens`);
    // },
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
        label="Tên phòng"
        name="name"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống!",
          },
        ]}
      >
        <Input placeholder="Nhập tên phòng" />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreatRoom;
