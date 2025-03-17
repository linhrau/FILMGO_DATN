import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const UpdateShow = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showtimeData, setShowTime] = useState([]);

  useEffect(() => {
    axios
      .get("http://filmgo.io.vn/api/screens")
      .then((res) => setScreens(res.data.data));
  }, []);
  useEffect(() => {
    axios
      .get("http://filmgo.io.vn/api/movies")
      .then((res) => setMovies(res.data.data));
  }, []);
  useEffect(() => {
    if (id) {
      axios.get(`http://filmgo.io.vn/api/showtimes/show/${id}`).then((res) => {
        setShowTime(res.data.data); // Lưu dữ liệu rạp phim vào state
      });
    }
  }, [id]);
  const { mutate } = useMutation({
    mutationFn: async (showtime) => {
      await axios.put(
        `http://filmgo.io.vn/api/showtimes/update/${id}`,
        showtime
      );
    },
    onSuccess: () => {
      nav(`/admin/list-showtime`);
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };
  console.log(showtimeData);

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
      initialValues={showtimeData || {}}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1 className="text-3xl mb-5">Cập nhật suất chiếu</h1>

      <Form.Item
        name="movie_id"
        label="Chọn phim"
        rules={[{ required: true, message: "Vui lòng Không bỏ trống" }]}
      >
        <Select placeholder="Chọn phim">
          {movies.map((movie) => (
            <Option key={movie.id} value={movie.id}>
              {movie.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="screen_id"
        label="Chọn phòng chiếu"
        rules={[{ required: true, message: "Vui lòng Không bỏ trống" }]}
      >
        <Select placeholder="Chọn phòng chiếu">
          {screens.map((screen) => (
            <Option key={screen.id} value={screen.id}>
              {screen.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Chọn giờ chiếu"
        name="start_time" //date of birth
        rules={[
          {
            required: true,
            message: "Bắt buộc chọn giờ chiếu",
          },
        ]}
      >
        <Input type="time" />
      </Form.Item>
      <Form.Item
        label="Chọn giờ kết thúc"
        name="end_time" //date of birth
        rules={[
          {
            required: true,
            message: "Bắt buộc chọn giờ kết thúc",
          },
        ]}
      >
        <Input type="time" />
      </Form.Item>
      <Form.Item
        label="Chọn ngày chiếu"
        name="date" //date of birth
        rules={[
          {
            required: true,
            message: "Bắt buộc chọn ngày chiếu",
          },
        ]}
      >
        <Input type="date" format="yyyy-mm-dd" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default UpdateShow;
