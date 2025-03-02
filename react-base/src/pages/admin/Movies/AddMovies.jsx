import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Upload } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddMovie = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get("http://filmgo.io.vn/api/actors")
      .then((res) => setActors(res.data.data));
    axios
      .get("http://filmgo.io.vn/api/genres")
      .then((res) => setGenres(res.data.data));
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("File ảnh trước khi gửi:", values.poster);

      // Kiểm tra nếu ảnh chưa được chọn
      if (!values.poster || values.poster.length === 0) {
        message.error("Vui lòng chọn ảnh bìa hợp lệ!");
        setLoading(false);
        return;
      }

      const posterFile = values.poster[0].originFileObj;
      console.log("🖼 File ảnh đã chọn:", posterFile);

      const formData = new FormData();
      formData.append("poster", posterFile);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("trailer", values.trailer);
      formData.append("duration", values.duration);
      formData.append("rating", values.rating);
      formData.append("release_date", values.release_date);

      values.genres.forEach((genre) => formData.append("genres[]", genre));
      values.actors.forEach((actor) => formData.append("actors[]", actor));

      console.log("📦 FormData trước khi gửi:", [...formData]);
      await axios.post("http://filmgo.io.vn/api/movies/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Thêm phim thành công!");
      navigate("/admin/list-movies");
    } catch (error) {
      console.error("❌ Lỗi API:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Thêm phim thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="title"
        label="Tên phim"
        rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
      >
        <Input.TextArea />
      </Form.Item>

      {/* Upload ảnh bìa */}
      <Form.Item
        name="poster"
        label="Ảnh bìa"
        valuePropName="fileList"
        getValueFromEvent={(e) => (e && e.fileList ? e.fileList : [])} // Fix lấy fileList đúng
        rules={[{ required: true, message: "Vui lòng chọn ảnh bìa hợp lệ!" }]}
      >
        <Upload
          beforeUpload={() => false} // Không tự động upload
          listType="picture-card"
          accept=".jpg,.jpeg,.png"
        >
          <Button>Chọn ảnh</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="trailer"
        label="Trailer"
        rules={[{ required: true, message: "Vui lòng nhập link trailer" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="duration"
        label="Thời lượng"
        rules={[{ required: true, message: "Vui lòng nhập thời lượng" }]}
      >
        <Input type="number" suffix="phút" />
      </Form.Item>
      <Form.Item
        name="rating"
        label="Đánh giá"
        rules={[{ required: true, message: "Vui lòng dánh giá" }]}
      >
        <Input type="number" step="0.1" max={10} min={0} />
      </Form.Item>
      <Form.Item
        name="release_date"
        label="Ngày phát hành"
        rules={[{ required: true, message: "Vui lòng ghi ngày phát hành" }]}
      >
        <Input type="date" />
      </Form.Item>

      {/* Chọn thể loại */}
      <Form.Item
        name="genres"
        label="Thể loại"
        rules={[{ required: true, message: "Vui lòng Không bỏ trống" }]}
      >
        <Select mode="multiple" placeholder="Chọn thể loại">
          {genres.map((genre) => (
            <Option key={genre.id} value={genre.id}>
              {genre.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Chọn diễn viên */}
      <Form.Item
        name="actors"
        label="Diễn viên"
        rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
      >
        <Select mode="multiple" placeholder="Chọn diễn viên">
          {actors.map((actor) => (
            <Option key={actor.id} value={actor.id}>
              {actor.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Thêm phim
      </Button>
    </Form>
  );
};

export default AddMovie;
