import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategory";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiProduct from "../../../api/apiProduct";

function CategoryList(){
     const [catesPagination, setCatesPagination] = useState([]);
     const [categories, setCategories] = useState([]);
     const [delCategoryItem, setDelCategoryItem] = useState(0)
    const [pages, setPages] = useState(1); // pages là tổng số trang

    const currentPage = parseInt(useParams().page) //Lấy page từ param trên URL
    const pageSize = 5 //Mỗi trang 5 cate

    // Lấy tất cả cate
     useEffect(() => {
       apiCategory.getAll().then((res) => {
         try {
           const categoriesData = res.data.map((category) => {
             return {
               id: category.id,
               name: category.attributes.category_name,
               parent: category.attributes.parent_id,
               status: category.attributes.status,
               slug: category.attributes.slug,
               hasChild: category.attributes.has_child,
             };
           });
           setCategories(categoriesData);
         } catch (error) {
           console.log("Error: ", error.message);
         }
       });
     }, []);

     // Lấy cate có phân trang
     useEffect(() => {
       apiCategory.getCatePagination(currentPage, pageSize).then((res) => {
         try {
           const totalPages = res.meta.pagination.pageCount;
           setPages(totalPages);

           const categoriesData = res.data.map((category) => {
             return {
               id: category.id,
               name: category.attributes.category_name,
               parent: category.attributes.parent_id,
               status: category.attributes.status,
               slug: category.attributes.slug,
               hasChild: category.attributes.has_child,
             };
           });
           setCatesPagination(categoriesData);
         } catch (error) {
           console.log("Error: ", error.message);
         }
       });
     }, [currentPage, delCategoryItem]);

     // xóa cate
     const delCategory = async (id) => {
        // Lấy dữ liệu cate cần xóa
        apiCategory.getCategoryById(id).then((res) => {
            try {
              const catData = res.data.data.attributes;
              // Dữ liệu cate cần xóa
              const delCate = {
                category_name: catData.category_name,
                slug: catData.slug,
                has_child: catData.has_child,
              };

              // Kiểm tra xem cate cần xóa đã có children hay chưa
              // Nếu có rồi thì k cho xóa
              if (delCate.has_child) {
                toast.warning(
                  `${delCate.category_name} had children, can not delete`,
                  {
                    position: "top-right",
                    autoClose: 3000,
                  }
                );
              } else {
                apiProduct.getProductByCatSlug(delCate.slug).then((res) => {
                  try {
                    // Lấy số lượng sản phẩm của cate cần xóa
                    const productAmount = res.data.length;

                    // Kiểm tra cate đã có product hay chưa
                    // Nếu có rồi thì k cho xóa
                    if (productAmount !== 0) {
                      toast.warning(
                        `${delCate.category_name} had products, can not delete`,
                        {
                          position: "top-right",
                          autoClose: 3000,
                        }
                      );
                    } else {
                      // Thực hiện xóa nếu cate chưa có product
                      apiCategory.delCategoryById(id).then((res) => {
                        try {
                          toast.info("Deleted category successfully", {
                            position: "top-right",
                            autoClose: 3000,
                          });
                          setDelCategoryItem(id);
                        } catch (error) {
                          console.log(
                            "Error occur when deleting category: ",
                            error.message
                          );
                        }
                      });
                    }
                  } catch (error) {
                    console.log(
                      "Error occur when get amount of product of cate that need to delete: ",
                      error.message
                    );
                  }
                });
              }
            } catch (error) {
                console.log(
                  "Error occur when get category that need to delete: ",
                  error.message
                );
            }
        })
     }

    return (
      <>
        <h1 class="mt-4">Category Management</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item active">Category List</li>
        </ol>
        <div style={{ margin: "20px 0" }}>
          <div>
            <Link to="/admin/category-add">
              <button type="button" class="btn btn-primary">
                Thêm
              </button>
            </Link>
          </div>
        </div>
        <table class="table table-bordered">
          <tr>
            <th>Id</th>
            <th>Tên danh mục</th>
            <th>Danh mục cha</th>
            <th>slug</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
          {catesPagination.map((category, index) => {
            return (
              <tr key={index}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  {categories.map((cate, index) => {
                    if (cate.id === category.parent) {
                      return cate.name;
                    }
                  })}
                </td>
                <td>{category.slug}</td>
                <td>
                  <Link to={`/admin/category-edit/${category.id}`}>
                    <button type="button" class="btn btn-warning rounded">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>
                </td>
                <td>
                  <Link>
                    <button
                      onClick={() => delCategory(category.id)}
                      type="button"
                      class="btn btn-danger rounded"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </Link>
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
                    to={`/admin/category/${currentPage - 1}`}
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
                  <Link
                    to={`/admin/category/${index + 1}`}
                    className="page-link"
                  >
                    <span>{index + 1}</span>
                  </Link>
                </li>
              ))}

              {currentPage < pages ? (
                <li className="page-item">
                  <Link
                    to={`/admin/category/${currentPage + 1}`}
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

export default CategoryList