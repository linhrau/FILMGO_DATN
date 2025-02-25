// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Skeleton,
//   Switch,
//   Upload,
//   message,
// } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useNavigate, useParams } from "react-router-dom";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";

// const EditProduct = () => {
//   const [form] = Form.useForm();
//   const nav = useNavigate();
//   const { id } = useParams();
//   const queryClient = useQueryClient();
//   const [fileList, setFileList] = useState([]);

//   const { isLoading, data } = useQuery({
//     queryKey: ["products", id],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:3000/products/${id}`);
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       form.setFieldsValue(data);
//       if (data.imageUrl) {
//         setFileList([
//           {
//             uid: "-1",
//             name: "image.png",
//             status: "done",
//             url: data.imageUrl, // Hiển thị ảnh cũ
//           },
//         ]);
//       }
//     }
//   }, [data, form]);

//   const { mutate, isLoading: isUpdating } = useMutation({
//     mutationFn: async (product) => {
//       await axios.put(`http://localhost:3000/products/${id}`, product);
//     },
//     onSuccess: () => {
//       message.success("Cập nhật sản phẩm thành công!");
//       queryClient.invalidateQueries(["products"]);
//       nav("/admin/products");
//     },
//     onError: () => {
//       message.error("Cập nhật thất bại, vui lòng thử lại.");
//     },
//   });

//   const onUploadChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   const onFinish = (values) => {
//     if (!confirm("Bạn có chắc chắn muốn cập nhật sản phẩm này?")) return;

//     const imageUrl =
//       fileList.length > 0 && fileList[0].status === "done"
//         ? fileList[0].url || fileList[0].response?.secure_url
//         : data?.imageUrl; // Giữ ảnh cũ nếu không có ảnh mới

//     mutate({ ...values, imageUrl });
//   };

//   return (
//     <div>
//       <Skeleton loading={isLoading}>
//         <Form form={form} onFinish={onFinish} layout="vertical">
//           <Form.Item
//             label="Tên sản phẩm"
//             name="name"
//             rules={[{ required: true, message: "Không được để trống" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item label="Ảnh sản phẩm">
//             <Upload
//               action="https://api.cloudinary.com/v1_1/dxhgeg7vi/image/upload"
//               listType="picture-card"
//               data={{ upload_preset: "upload-demo" }}
//               fileList={fileList}
//               onChange={onUploadChange}
//               beforeUpload={() => false} // Không tự động upload
//             >
//               {fileList.length < 1 && (
//                 <div>
//                   <PlusOutlined />
//                   <div style={{ marginTop: 8 }}>Upload</div>
//                 </div>
//               )}
//             </Upload>
//           </Form.Item>

//           <Form.Item
//             label="Năm phát hành"
//             name="year"
//             rules={[{ required: true, message: "Vui lòng nhập năm phát hành" }]}
//           >
//             <InputNumber
//               min={1900}
//               max={new Date().getFullYear()}
//               placeholder="Nhập năm phát hành"
//               style={{ width: "100%" }}
//             />
//           </Form.Item>

//           <Form.Item
//             label="Tình trạng"
//             name="available"
//             valuePropName="checked"
//           >
//             <Switch />
//           </Form.Item>

//           <Form.Item
//             label="Danh mục"
//             name="category"
//             rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
//           >
//             <Select>
//               <Select.Option value="Tình cảm">Tình cảm</Select.Option>
//               <Select.Option value="Phiêu lưu">Phiêu lưu</Select.Option>
//               <Select.Option value="Viễn tưởng">Viễn tưởng</Select.Option>
//               <Select.Option value="Kinh dị">Kinh dị</Select.Option>
//               <Select.Option value="Hài">Hài</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={isUpdating}>
//               Cập nhật sản phẩm
//             </Button>
//           </Form.Item>
//         </Form>
//       </Skeleton>
//     </div>
//   );
// };

// export default EditProduct;
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Switch,
  Upload,
  DatePicker,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs"; // Dùng để format ngày

const EditProduct = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState([]);

  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        releaseDate: data.releaseDate ? dayjs(data.releaseDate) : null,
      });
      if (data.imageUrl) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: data.imageUrl,
          },
        ]);
      }
    }
  }, [data, form]);

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: async (product) => {
      await axios.put(`http://localhost:3000/products/${id}`, product);
    },
    onSuccess: () => {
      message.success("Cập nhật sản phẩm thành công!");
      queryClient.invalidateQueries(["products"]);
      nav("/admin/products");
    },
    onError: () => {
      message.error("Cập nhật thất bại, vui lòng thử lại.");
    },
  });

  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish = (values) => {
    if (!confirm("Bạn có chắc chắn muốn cập nhật sản phẩm này?")) return;

    const imageUrl =
      fileList.length > 0 && fileList[0].status === "done"
        ? fileList[0].url || fileList[0].response?.secure_url
        : data?.imageUrl; // Giữ ảnh cũ nếu không có ảnh mới

    const formattedValues = {
      ...values,
      imageUrl,
      releaseDate: values.releaseDate
        ? values.releaseDate.format("YYYY-MM-DD")
        : null,
      createdAt: data?.createdAt || new Date().toISOString().split("T")[0], // Giữ ngày tạo ban đầu
    };

    mutate(formattedValues);
  };

  return (
    <div>
      <Skeleton loading={isLoading}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm">
            <Upload
              action="https://api.cloudinary.com/v1_1/dxhgeg7vi/image/upload"
              listType="picture-card"
              data={{ upload_preset: "upload-demo" }}
              fileList={fileList}
              onChange={onUploadChange}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Năm phát hành"
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

          <Form.Item label="Lịch chiếu" name="releaseDate">
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="Tình trạng"
            name="available"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select>
              <Select.Option value="Tình cảm">Tình cảm</Select.Option>
              <Select.Option value="Phiêu lưu">Phiêu lưu</Select.Option>
              <Select.Option value="Viễn tưởng">Viễn tưởng</Select.Option>
              <Select.Option value="Kinh dị">Kinh dị</Select.Option>
              <Select.Option value="Hài">Hài</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Cập nhật sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </div>
  );
};

export default EditProduct;
