import { useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;
const EditShow = () => {
  const nav = useNavigate();
  const { id } = useParams(); // Get the showtime ID from the URL
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showtime, setShowtime] = useState(null);

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
        const showtimeData = res.data.data;
        setShowtime(showtimeData);
      });
    }
  }, [id]);

  const { mutate } = useMutation({
    mutationFn: async (showtimeData) => {
      await axios.put(
        `http://filmgo.io.vn/api/showtimes/show/${id}`,
        showtimeData
      );
    },
    onSuccess: () => {
      nav(`/admin/list-showtime`);
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  if (!showtime && id) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

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
        movie_id: showtime?.movie_id,
        screen_id: showtime?.screen_id,
        start_time: showtime ? dayjs(showtime.start_time, "HH:mm:ss") : null,
        end_time: showtime ? dayjs(showtime.end_time, "HH:mm:ss") : null,
        date: showtime ? dayjs(showtime.date) : null,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1 className="text-3xl mb-5">Chỉnh sửa xuất chiếu</h1>

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
        name="start_time"
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
        name="end_time"
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
        name="date"
        rules={[
          {
            required: true,
            message: "Bắt buộc chọn ngày chiếu",
          },
        ]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditShow;
