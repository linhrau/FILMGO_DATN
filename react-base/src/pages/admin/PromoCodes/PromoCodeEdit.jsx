import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const PromoCodeEdit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form] = Form.useForm(); 

  const { data, isLoading } = useQuery({
    queryKey: ["promocode", id],
    queryFn: async () => {
      const response = await axios.get(`http://filmgo.io.vn/api/promocodes/show/${id}`);
      console.log("Data from API:", response.data); // Kiểm tra cấu trúc dữ liệu
      return response.data.data; // Chỉ lấy phần data
    },
    enabled: !!id, 
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        code: data.code || '',
        description: data.description || '',
        discount_amount: data.discount_amount || 0,
        status: data.status || false,
        start_date: data.start_date ? dayjs(data.start_date) : null,
        end_date: data.end_date ? dayjs(data.end_date) : null,
      });
    }
  }, [data, form]);

  const { mutate } = useMutation({
    mutationFn: async (promocode) => {
      try {
        const response = await axios.put(`http://filmgo.io.vn/api/promocodes/update/${id}`, promocode);
        return response.data;
      } catch (error) {
        console.error("❌ API Error:", error.response?.data || error.message);
        throw error;
      }
    },
});

  const onFinish = (values) => {
    const formattedValues = {
      id,
      ...values,
      start_date: values.start_date ? values.start_date.format("YYYY-MM-DD") : null,
      end_date: values.end_date ? values.end_date.format("YYYY-MM-DD") : null,
      status: values.status ? 1 : 0,
      discount_amount: Number(values.discount_amount), // Ensure this is a number
    };
  
    // Log the data being sent to the API for debugging
    console.log("🛠 Dữ liệu gửi lên API:", formattedValues);
  
    // Validate discount_amount
    if (formattedValues.discount_amount < 0) {
      message.error("Giá trị giảm không hợp lệ!");
      return;
    }
  
    mutate(formattedValues);
  };
  

  if (isLoading) return <p>Đang tải...</p>;

  return (
    <div>
      <h1 className="text-4xl my-8">Chỉnh sửa mã khuyến mãi</h1>
      <Form
        form={form}
        name="edit-form"
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
          <Button htmlType="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PromoCodeEdit;