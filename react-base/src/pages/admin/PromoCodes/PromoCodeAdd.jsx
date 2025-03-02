import { useMutation } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PromoCodeAdd = () => {
  const navigate = useNavigate();
  
  const { mutate } = useMutation({
    mutationFn: async (promocode) => {
      await axios.post('http://filmgo.io.vn/api/promocodes/create', promocode);
    },
    onSuccess: () => {
      navigate("/admin/promocodes");
    },
    onError: (error) => {
      console.error("Error submitting promocode:", error.response.data);
    },
  });

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      start_date: values.start_date ? values.start_date.format("YYYY-MM-DD") : null,
      end_date: values.end_date ? values.end_date.format("YYYY-MM-DD") : null,
    };

    console.log("Submitting:", formattedValues);
    mutate(formattedValues);
  };

  return (
    <div>
      <h1 className="text-4xl my-8">Thêm mới mã khuyến mãi</h1>
      <Form
        name="add-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Mã khuyến mãi"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã khuyến mãi" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả mã khuyến mãi" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Giá trị giảm"
          name="discount_amount"
          rules={[{ required: true, message: "Vui lòng nhập giá trị giảm" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          label="Ngày bắt đầu"
          name="start_date"
          rules={[{ required: true, message: "Vui lòng nhập ngày bắt đầu" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="end_date"
          rules={[{ required: true, message: "Vui lòng nhập ngày kết thúc" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">ADD</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PromoCodeAdd;
