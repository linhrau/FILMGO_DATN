import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Skeleton, message } from "antd";
import axios from "axios";

// Function to get the access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

const DetailTiket = () => {
  // Get ticket ID from the URL using useParams hook
  const { id } = useParams();

  // Fetch ticket details based on ticketId
  const { data, isLoading, error } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const token = getAccessToken();
      if (!token) {
        throw new Error("Token không hợp lệ hoặc không tồn tại");
      }

      const response = await axios.get(
        `http://filmgo.io.vn/api/admin/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    },
    onError: (err) => {
      message.error(err.message || "Something went wrong!");
    },
  });

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    return <div>Error loading ticket details: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl mb-5">Chi tiết vé</h1>

      <Card title="Thông tin vé" style={{ width: 600 }}>
        <p>
          <strong>Mã vé:</strong> {data.ticket_id}
        </p>
        <p>
          <strong>Code:</strong> {data.ticket_code}
        </p>
        <p>
          <strong>Tên người dùng:</strong> {data.user_name}
        </p>
        <p>
          <strong>Tên phim:</strong> {data.movie_name}
        </p>
        <p>
          <strong>Thời gian:</strong> {data.showtime}
        </p>
        <p>
          <strong>Trạng thái:</strong> {data.status}
        </p>
      </Card>
    </div>
  );
};

export default DetailTiket;
