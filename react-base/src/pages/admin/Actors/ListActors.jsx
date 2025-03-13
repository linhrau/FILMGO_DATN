import React, { useEffect, useState } from "react";
import {
  Table,
  Avatar,
  Typography,
  Card,
  Button,
  Popconfirm,
  message,
} from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const API_ACTORS = "http://filmgo.io.vn/api/actors";

const ApiList = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch(API_ACTORS)
      .then((res) => res.json())
      .then((data) => setActors(data.data))
      .catch((error) => console.error("Error fetching actors:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_ACTORS}/delete/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        message.success("Diễn viên đã được xoá thành công");
        setActors((prevActors) =>
          prevActors.filter((actor) => actor.id !== id)
        );
      })
      .catch(() => message.error("Xoá diễn viên thất bại"));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, actor) => (
        <Popconfirm
          title="Bạn có chắc muốn xoá diễn viên này?"
          onConfirm={() => handleDelete(actor.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger>Xoá</Button>
          <Link to={`/admin/update-actors/${actor.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/admin/create-actors" className="btn btn-primary">
        Thêm dien vien
      </Link>
      <Card title={<Title level={2}>Actors List</Title>}>
        <Table columns={columns} dataSource={actors} />
        {/* rowKey="id" */}
      </Card>
    </div>
  );
};

export default ApiList;
