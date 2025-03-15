import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const ListShow = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);

  // Lấy danh sách xuất chiếu
  useEffect(() => {
    axios
      .get("http://filmgo.io.vn/api/showtimes")
      .then((res) => setShowtimes(res.data.data))
      .catch((error) => console.error("Error fetching showtimes:", error));
  }, []);

  // Lấy danh sách phim
  useEffect(() => {
    axios
      .get("http://filmgo.io.vn/api/movies")
      .then((res) => setMovies(res.data.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  // Lấy danh sách phòng chiếu
  useEffect(() => {
    axios
      .get("http://filmgo.io.vn/api/screens")
      .then((res) => setScreens(res.data.data))
      .catch((error) => console.error("Error fetching screens:", error));
  }, []);

  // Tạo cột cho bảng
  const columns = [
    {
      title: "Phim",
      dataIndex: "movie_id", // ID của phim
      key: "movie_id",
      render: (movieId) => {
        const movie = movies.find((m) => m.id === movieId);
        return movie ? movie.title : "Không có dữ liệu"; // Hiển thị tên phim
      },
    },
    {
      title: "Phòng chiếu",
      dataIndex: "screen_id", // ID của phòng chiếu
      key: "screen_id",
      render: (screenId) => {
        const screen = screens.find((s) => s.id === screenId);
        return screen ? screen.name : "Không có dữ liệu"; // Hiển thị tên phòng chiếu
      },
    },
    {
      title: "Ngày chiếu",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"), // Định dạng ngày
    },
    {
      title: "Giờ chiếu",
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => moment(text).format("HH:mm"),
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => moment(text).format("HH:mm"), // Định dạng giờ kết thúc
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Link to={`/admin/edit-showtime/${record.id}`}>
          <Button type="primary">Sửa</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl mb-5">Danh sách xuất chiếu</h1>
      <Table
        columns={columns}
        dataSource={showtimes}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ListShow;
