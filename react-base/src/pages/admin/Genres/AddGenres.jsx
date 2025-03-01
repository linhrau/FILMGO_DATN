// import { useState } from "react";
// import { Card, Form, Input, Button, message } from "antd";
// import { useQueryClient } from "@tanstack/react-query"; // Import React Query
// import { useNavigate } from "react-router-dom";

// const AddGenres = () => {
//   const [form] = Form.useForm();
//   const nav = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [messageApi, contextHolder] = message.useMessage();
//   const queryClient = useQueryClient(); // Sử dụng React Query để cập nhật dữ liệu

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("name", values.name);

//     try {
//       const response = await fetch("http://filmgo.io.vn/api/genres/create", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         messageApi.open({
//           type: "success",
//           content: "Thêm thể loại thành công!",
//         });

//         // Cập nhật lại danh sách thể loại sau khi thêm thành công
//         queryClient.invalidateQueries({ queryKey: ["genres"] });

//         form.resetFields();
//       } else {
//         messageApi.open({
//           type: "error",
//           content: `Lỗi: ${data.message || "Không thể thêm thể loại!"}`,
//         });
//       }
//     } catch (error) {
//       messageApi.open({
//         type: "error",
//         content: "Có lỗi xảy ra, vui lòng thử lại sau!",
//       });
//     }
//     setLoading(false);
//     nav("/admin/genres");
//   };

//   return (
//     <Card title="Thêm thể loại phim" style={{ maxWidth: 500, margin: "auto" }}>
//       {contextHolder}
//       <Form form={form} onFinish={handleSubmit} layout="vertical">
//         <Form.Item
//           label="Tên thể loại"
//           name="name"
//           rules={[{ required: true, message: "Vui lòng nhập tên thể loại!" }]}
//         >
//           <Input placeholder="Nhập tên thể loại" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Thêm thể loại
//           </Button>
//         </Form.Item>
//       </Form>
//     </Card>
//   );
// };

// export default AddGenres;
import { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useQueryClient } from "@tanstack/react-query";

const AddGenres = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Hook chuyển hướng

  const handleSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);

    try {
      const response = await fetch("http://filmgo.io.vn/api/genres/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Thêm thể loại thành công!"); // Hiển thị thông báo

        // Cập nhật danh sách
        queryClient.invalidateQueries({ queryKey: ["genres"] });

        // Reset form
        form.resetFields();

        // ⏳ Chờ 1 giây rồi mới chuyển hướng (để thông báo hiển thị đủ lâu)
        setTimeout(() => {
          navigate("/admin/genres"); // Chuyển hướng đến trang danh sách thể loại
        }, 1000);
      } else {
        message.error(`Lỗi: ${data.message || "Không thể thêm thể loại!"}`);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
    setLoading(false);
  };

  return (
    <Card title="Thêm thể loại phim" style={{ maxWidth: 500, margin: "auto" }}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Tên thể loại"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên thể loại!" }]}
        >
          <Input placeholder="Nhập tên thể loại" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm thể loại
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddGenres;
