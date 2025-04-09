import React from "react";
import {
  Button,
  Image,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Table,
  Tag,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const ListMovies = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const token = getAccessToken(); // Lấy token
      if (!token) {
        throw new Error("Không có access token");
      }
      await axios.delete(`http://filmgo.io.vn/api/movies/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm Authorization header
        },
      });
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Bạn đã xoá phim thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Xoá phim thất bại, vui lòng thử lại sau",
      });
    },
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await axios.get(`http://filmgo.io.vn/api/movies`);
      return response.data.data.map((movie) => ({
        ...movie,
        key: movie.id,
      }));
    },
  });

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ảnh",
      dataIndex: "poster",
      key: "poster",
      render: (poster) => <Image width={50} src={poster} />,
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      render: (trailer) => (
        <a href={trailer} target="_blank" rel="noopener noreferrer">
          Xem trailer
        </a>
      ),
    },
    {
      title: "Ngày phát hành",
      dataIndex: "release_date",
      key: "release_date",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Thể loại",
      key: "genres",
      dataIndex: "genres",
      render: (genres) => (
        <>
          {genres.map((genre) => (
            <Tag key={genre.genre_id}>{genre.name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Diễn viên",
      key: "actors",
      dataIndex: "actors",
      render: (actors) => (
        <>
          {actors.map((actor) => (
            <Tag key={actor.actor_id}>{actor.name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
      key: "duration",
      render: (text) => <Tag color="cyan">{text} phút</Tag>,
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (text) => <Tag color="gold">{text}</Tag>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, movie) => (
        <Space direction="vertical">
          <Popconfirm
            title="Bạn có chắc muốn xoá phim này?"
            onConfirm={() => mutate(movie.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
          <Link to={`/admin/update-movies/${movie.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <center>
        <h1>Quản lý phim</h1>
      </center>
      <Link to="/admin/create-movies" className="btn btn-primary">
        Thêm phim
      </Link>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </>
  );
};

export default ListMovies;
