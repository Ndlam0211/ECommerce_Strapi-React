import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import apiProduct from "../../../api/apiProduct"
import { imageURL } from "../../../api/config"
import { toast } from "react-toastify"
import apiOrderDetail from "../../../api/apiOrderDetail"

function ProductList(){
    const [products,setProducts] = useState([])
    const [pages,setPages] = useState(1)
    const [delProductItem,setDelProductItem] = useState(0)

    const currentPage = parseInt(useParams().page) //Lấy page từ param trên URL
    const pageSize = 5 //Mỗi trang 5 sản phẩm

    // Lấy sản phẩm phân trang
    useEffect(() => {
      apiProduct.getProductPagination(currentPage, pageSize).then((res) => {
        try {
          // Tính tổng số page
          const totalPages = Math.ceil(res.meta.pagination.total / pageSize);
          setPages(totalPages);

          const productsData = res.data.map((product) => {
            return {
              id: product.id,
              name: product.attributes.product_name,
              price: product.attributes.price,
              description: product.attributes.description,
              slug: product.attributes.slug,
              categoryName:
                product.attributes.category.data.attributes.category_name,
              image: product.attributes.image.data.attributes.url,
              isOnSale: product.attributes.is_on_sale,
              salePrice: product.attributes.sale_price,
            };
          });
          setProducts(productsData);
        } catch (error) {
          console.log("Failed to get product list: ", error.message);
        }
      });
    }, [currentPage, delProductItem]);
    
    const deleteProduct = (id) => {
      apiOrderDetail.getODsByProductId(id).then((res) => {
        if(res.data.length > 0) {
          toast.warn("can not delete product that be ordered",{
            autoClose: 3000,
            position: "top-right",
          })
        }else{
          apiProduct.deleteProductById(id).then((res) => {
            try {
              toast.info("Delete product successfully", {
                position:"top-right",
                autoClose:3000
              })
              setDelProductItem(id)
            } catch (error) {
              toast.error("Failed to delete product", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          })
        }
      })
    }

    return (
        <>
            <h1 className="mt-4">Product Management</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Product List</li>
            </ol>
            <div style={{"margin":"20px 0"}}>
                <div><Link to="/admin/product-add"><button type="button" className="btn btn-primary">Thêm</button></Link></div>
            </div>
            <table className="table table-bordered">
                <tr>
                    <th>Id</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Khuyễn mãi</th>
                    <th>Xem</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                {
                    products.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                              <img src={imageURL + product.image} alt="" width="100" />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.price}</td>
                            <td>{product.salePrice}</td>
                            <td>
                              <Link to={`/product-detail/${product.slug}`}>
                                <button
                                  type="button"
                                  className="btn btn-primary rounded"
                                >
                                  <i className="fa-solid fa-eye"></i>
                                </button>
                              </Link>
                            </td>
                            <td>
                              <Link to={`/admin/product-edit/${product.slug}`}>
                                <button
                                  type="button"
                                  className="btn btn-warning rounded"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                              </Link>
                            </td>
                            <td>
                              <a >
                                <button
                                  type="button"
                                  className="btn btn-danger rounded"
                                  onClick={(e) => deleteProduct(product.id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </a>
                            </td>
                          </tr>
                        );
                    })
                }
            </table>
            {/* <!-- Phân trang --> */}
            <div style={{"display":"flex","justify-content":"center"}}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            currentPage>1?
                            <li className="page-item"><Link to={`/admin/products/${currentPage-1}`} className="page-link" ><i className="fa-solid fa-chevron-left"></i></Link></li>
                            :""
                        }
                            
                        {   
                            Array.from(Array(pages).keys()).map((index) => (
                                <li key={index} className={`page-item ${index+1 === currentPage ? "active" : ""}`}><Link to={`/admin/products/${index+1}`} className="page-link" ><span>{index+1}</span></Link></li>
                            ))
                        }
                        {
                            currentPage<pages?
                            <li className="page-item"><Link to={`/admin/products/${currentPage+1}`} className="page-link"><i className="fa-solid fa-chevron-right"></i></Link></li>
                            : ""
                        }
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default ProductList