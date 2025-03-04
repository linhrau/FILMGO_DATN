import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Button,
  Popconfirm,
  message,
  Image,
} from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const API_PRODUCTS = "http://filmgo.io.vn/api/products";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_PRODUCTS)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_PRODUCTS}/delete/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        message.success("Combo đã được xoá thành công");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch(() => message.error("Xoá combo thất bại"));
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Combo",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={111} />,
    },
    {
      title: "Giá combo",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{parseInt(price).toLocaleString()} VNĐ</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, product) => (
        <Popconfirm
          title="Bạn có chắc muốn xoá combo này?"
          onConfirm={() => handleDelete(product.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger>Xoá</Button>
          <Link to={`/admin/products/update/${product.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <center>
        <h1 className="text-3xl mb-5">Quản lý Combo</h1>
      </center>
      <Link to="/admin/products/add" className="btn btn-primary">
        <Button  type="primary">Thêm Combo</Button>
      </Link>
      <Table columns={columns} dataSource={products} rowKey="id" /> {/* Set rowKey here */}
    </div>
  );
};

export default ListProduct;
