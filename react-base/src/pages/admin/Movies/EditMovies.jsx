import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Upload } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const EditMovies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://filmgo.io.vn/api/movies/show/${id}`
        );
        console.log("📌 Dữ liệu từ API:", response.data); // Kiểm tra API trả về
        setMovie(response.data.data); // Cập nhật state
      } catch (error) {
        console.error("❌ Lỗi khi lấy phim:", error);
      }
    };

    if (id) fetchMovie();
  }, [id]); // Chạy khi `id` thay đổi
  useEffect(() => {
    const fetchActorsAndGenres = async () => {
      try {
        const [actorsRes, genresRes] = await Promise.all([
          axios.get("http://filmgo.io.vn/api/actors"),
          axios.get("http://filmgo.io.vn/api/genres"),
        ]);
        setActors(actorsRes.data.data);
        setGenres(genresRes.data.data);
      } catch (error) {
        console.error("❌ Lỗi khi lấy diễn viên & thể loại:", error);
      }
    };

    fetchActorsAndGenres();
  }, []);

  useEffect(() => {
    // if (movie) {
    //   console.log("📌 Đang cập nhật form với dữ liệu:", movie);
    //   form.setFieldsValue({
    //     title: movie.title || "",
    //     description: movie.description || "",
    //     trailer: movie.trailer || "",
    //     duration: movie.duration || "",
    //     rating: movie.rating || "",
    //     release_date: movie.release_date || "",
    //     genres: movie.genres?.map((g) => g.name) || [], // Nếu có genres
    //     actors: movie.actors?.map((a) => a.name) || [], // Nếu có actors
    //   });
    // }
    if (movie) {
      console.log("📌 Đang cập nhật form với dữ liệu:", movie);
      form.setFieldsValue({
        title: movie.title || "",
        description: movie.description || "",
        trailer: movie.trailer || "",
        duration: movie.duration || "",
        rating: movie.rating || "",
        release_date: movie.release_date || "",
        genres: movie.genres?.map((g) => g.genre_id) || [], // Sử dụng id thay vì name
        actors: movie.actors?.map((a) => a.actor_id) || [], // Sử dụng id thay vì name
      });
    }
    console.log("📌 Dữ liệu diễn viên từ API:", movie?.actors);
  }, [movie]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("trailer", values.trailer);
      formData.append("duration", values.duration);
      formData.append("rating", values.rating);
      formData.append("release_date", values.release_date);
      values.genres.forEach((genre) => formData.append("genres[]", genre));
      values.actors.forEach((actor) => formData.append("actors[]", actor));

      if (values.poster && values.poster.length > 0) {
        formData.append("poster", values.poster[0].originFileObj);
      }

      await axios.post(
        `http://filmgo.io.vn/api/movies/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Cập nhật phim thành công!");
      navigate("/admin/list-movies");
    } catch (error) {
      console.error("❌ Lỗi API:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Cập nhật thất bại!");
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

      {/* <Form.Item
        name="poster"
        label="Ảnh bìa"
        valuePropName="fileList"
        getValueFromEvent={(e) => (e && e.fileList ? e.fileList : [])}
      >
        <Upload
          beforeUpload={() => false}
          listType="picture-card"
          accept=".jpg,.jpeg,.png"
        >
          <Button>Chọn ảnh</Button>
        </Upload>
      </Form.Item> */}
      <Form.Item name="poster" label="Ảnh bìa">
        <Upload
          beforeUpload={() => false}
          listType="picture-card"
          accept=".jpg,.jpeg,.png"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          {fileList.length === 0 && movie?.poster ? (
            <img src={movie.poster} alt="Ảnh bìa" style={{ width: "100%" }} />
          ) : (
            <Button>Chọn ảnh</Button>
          )}
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
        rules={[{ required: true, message: "Vui lòng đánh giá" }]}
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
      {/* <Form.Item label="Thể loại" name="genres">
        <Select mode="multiple" placeholder="Chọn thể loại">
          {movie?.genres?.map((genre) => (
            <Select.Option key={genre.genre_id} value={genre.name}>
              {genre.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Diễn viên" name="actors">
        <Select mode="multiple" placeholder="Chọn diễn viên">
          {movie?.actors?.map((actor) => (
            <Select.Option key={actor.actor_id} value={actor.name}>
              {actor.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}

      <Form.Item label="Thể loại" name="genres">
        <Select mode="multiple" placeholder="Chọn thể loại">
          {genres.map((genre) => (
            <Select.Option key={genre.id} value={genre.id}>
              {genre.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item label="Diễn viên" name="actors">
        <Select mode="multiple" placeholder="Chọn diễn viên">
          {actors.map((actor) => (
            <Select.Option key={actor.id} value={actor.id}>
              {actor.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}
      {/* <Form.Item label="Diễn viên" name="actors">
        <Select
          mode="multiple"
          placeholder="Chọn diễn viên"
          value={form.getFieldValue("actors")}
        >
          {actors.map((actor) => (
            <Select.Option key={actor.id} value={actor.id}>
              {actor.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}
      <Form.Item label="Diễn viên" name="actors">
        <Select mode="multiple" placeholder="Chọn diễn viên">
          {actors.map((actor) => (
            <Select.Option key={actor.id} value={actor.id}>
              {actor.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Cập nhật phim
      </Button>
      <Button
        onClick={() => window.location.reload()}
        style={{ marginLeft: 10 }}
      >
        Refresh trang
      </Button>
    </Form>
  );
};

export default EditMovies;
