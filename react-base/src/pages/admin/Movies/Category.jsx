// // import React from "react";

// // const Category = () => {
// //   return <div>Category</div>;
// // };

// // export default Category;
// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Nếu dùng axios, có thể cài đặt bằng npm install axios

// // Dữ liệu các danh mục
// const categories = [
//   "All",
//   "Tình cảm",
//   "Phiêu lưu",
//   "Kinh dị",
//   "Hài",
//   "Viễn tưởng",
// ];

// const ProductFilter = () => {
//   const [products, setProducts] = useState([]); // State để lưu sản phẩm
//   const [selectedCategory, setSelectedCategory] = useState("All"); // State để lưu danh mục chọn
//   const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu

//   // Fetch dữ liệu từ API
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products")
//       .then((response) => {
//         setProducts(response.data); // Lưu dữ liệu vào state
//         setLoading(false); // Đổi trạng thái loading
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the products!", error);
//         setLoading(false); // Đổi trạng thái loading
//       });
//   }, []); // Chạy 1 lần khi component mount

//   // Lọc sản phẩm theo danh mục
//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter((product) => product.category === selectedCategory);

//   return (
//     <div className="container mt-5">
//       {/* <h1 className="mb-4">Product List</h1> */}

//       {/* Dropdown để chọn danh mục */}
//       <div className="mb-4">
//         <label htmlFor="categorySelect" className="form-label">
//           Select Category
//         </label>
//         <select
//           id="categorySelect"
//           className="form-select"
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           value={selectedCategory}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Hiển thị danh sách sản phẩm */}
//       <div className="row">
//         {loading ? (
//           <p>Loading products...</p>
//         ) : filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div key={product.id} className="col-md-4 mb-3">
//                 <img src={product.imageUrl} alt={product.name} className="card-img-top" />
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text">Thể loại: {product.category}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductFilter;
import React, { useState, useEffect } from "react";
import axios from "axios"; // Nếu bạn dùng axios

// Dữ liệu các danh mục
const categories = [
  "All",
  "Tình cảm",
  "Phiêu lưu",
  "Kinh dị",
  "Hài",
  "Viễn tưởng",
];

const Category = () => {
  const [products, setProducts] = useState([]); // State để lưu sản phẩm
  const [selectedCategory, setSelectedCategory] = useState("All"); // State để lưu danh mục chọn
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu

  // Fetch dữ liệu từ API
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Đổi trạng thái loading
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false); // Đổi trạng thái loading
      });
  }, []); // Chạy 1 lần khi component mount

  // Lọc sản phẩm theo danh mục
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product List</h1>

      {/* Dropdown để chọn danh mục */}
      <div className="mb-4">
        <label htmlFor="categorySelect" className="form-label">
          Select Category
        </label>
        <select
          id="categorySelect"
          className="form-select"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị danh sách sản phẩm */}
      <div>
        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <ul className="list-group">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {/* Hiển thị ảnh và tên sản phẩm */}
                <div className="d-flex align-items-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="img-thumbnail"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <span>{product.name}</span>
                </div>
                <span className="badge bg-primary rounded-pill">
                  {product.category}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
