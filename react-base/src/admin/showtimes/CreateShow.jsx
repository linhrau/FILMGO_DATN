import { useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // For handling time formatting

const { Option } = Select;
const CreateShow = () => {
  const nav = useNavigate();
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);

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
  const { mutate } = useMutation({
    mutationFn: async (showtime) => {
      await axios.post(`http://filmgo.io.vn/api/showtimes/create`, showtime);
    },
    onSuccess: () => {
      nav(`/admin/list-showtime`);
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
      <h1 className="text-3xl mb-5">Thêm xuất chiếu</h1>

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
export default CreateShow;
