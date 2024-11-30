import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";
import { toast } from "react-toastify";

export default function BrandList() {
    const [brands, setBrands] = useState([]);
    const [pages, setPages] = useState(1);
    const [delBrandItem, setDelBrandItem] = useState(null);

    const currentPage = parseInt(useParams().page); //Lấy page từ param trên URL
    const pageSize = 5; //Mỗi trang 5 brand

    // Lấy brand phân trang
    useEffect(() => {
        apiBrand.getBrandPagination(currentPage, pageSize).then((res) => {
        try {
            // Tính tổng số page
            const totalPages = Math.ceil(
            res.meta.pagination.total / pageSize
            );
            setPages(totalPages);

            const brandsData = res.data.map((brand) => {
                return {
                    id: brand.id,
                    name: brand.attributes.brand_name,
                    slug: brand.attributes.slug,
                    address: brand.attributes.address,
                };
            });
            setBrands(brandsData);
        } catch (error) {
            console.log("Failed to get brand list: ", error.message);
        }
        });
    }, [currentPage, delBrandItem]);

    const deleteBrand = (id) => {
        apiBrand.delBrandById(id).then((res) => {
        try {
            toast.info("Delete brand successfully", {
            position: "top-right",
            autoClose: 3000,
            });
            setDelBrandItem(id);
        } catch (error) {
            toast.error("Failed to delete brand", {
            position: "top-right",
            autoClose: 3000,
            });
        }
        });
    };
  return (
    <>
      <h1 className="mt-4">Brand Management</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Brand List</li>
      </ol>
      <div style={{ margin: "20px 0" }}>
        <div>
          <Link to="/admin/brand-add">
            <button type="button" className="btn btn-primary">
              Thêm
            </button>
          </Link>
        </div>
      </div>
      <table className="table table-bordered">
        <tr>
          <th>Id</th>
          <th>Tên nhà cung cấp</th>
          <th>Address</th>
          <th>Slug</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
        {brands.map((brand) => {
          return (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>{brand.address}</td>
              <td>{brand.slug}</td>
              <td>
                <Link to={`/admin/brand-edit/${brand.slug}`}>
                  <button type="button" className="btn btn-warning rounded">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </Link>
              </td>
              <td>
                <a>
                  <button
                    type="button"
                    className="btn btn-danger rounded"
                    onClick={(e) => deleteBrand(brand.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </a>
              </td>
            </tr>
          );
        })}
      </table>
      {/* <!-- Phân trang --> */}
      <div style={{ display: "flex", "justify-content": "center" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {currentPage > 1 ? (
              <li className="page-item">
                <Link
                  to={`/admin/brands/${currentPage - 1}`}
                  className="page-link"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </Link>
              </li>
            ) : (
              ""
            )}

            {Array.from(Array(pages).keys()).map((index) => (
              <li
                key={index}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <Link to={`/admin/brands/${index + 1}`} className="page-link">
                  <span>{index + 1}</span>
                </Link>
              </li>
            ))}
            {currentPage < pages ? (
              <li className="page-item">
                <Link
                  to={`/admin/brands/${currentPage + 1}`}
                  className="page-link"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
