import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiOrder from "../../../api/apiOrder";
import { toast } from "react-toastify";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [pages, setPages] = useState(1);
    const [delOrderItem, setDelOrderItem] = useState(null);

    const currentPage = parseInt(useParams().page); //Lấy page từ param trên URL
    const pageSize = 5; //Mỗi trang 5 brand

    // Lấy order có phân trang
    useEffect(() => {
        apiOrder.getOrderPagination(currentPage, pageSize).then((res) => {
        try {
            // Tính tổng số page
            const totalPages = Math.ceil(
            res.meta.pagination.total / pageSize
            );
            setPages(totalPages);

            const ordersData = res.data.map((order) => {
                return {
                    id: order.id,
                    userId: order.attributes.user_id,
                    customerName: order.attributes.customer_name,
                    phone: order.attributes.phone,
                    shippingAddress: order.attributes.shipping_address,
                    total: order.attributes.total,
                };
            });
            setOrders(ordersData);
        } catch (error) {
            console.log("Failed to get order list: ", error.message);
        }
        });
    }, [currentPage, delOrderItem]);

    const deleteOrder = (id) => {
        apiOrder.delOrderById(id).then((res) => {
        try {
            toast.info("Deleted order successfully", {
            position: "top-right",
            autoClose: 3000,
            });
            setDelOrderItem(id);
        } catch (error) {
            toast.error("Failed to delete order", {
            position: "top-right",
            autoClose: 3000,
            });
        }
        });
    };
  return (
    <>
      <h1 className="mt-4">Order Management</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Order List</li>
      </ol>
      <div style={{ margin: "20px 0" }}>
        <div>
          <Link to="/admin/order-add">
            <button type="button" className="btn btn-primary">
              Thêm
            </button>
          </Link>
        </div>
      </div>
      <table className="table table-bordered">
        <tr>
          <th>Mã đơn hàng</th>
          <th>Tên khách hàng</th>
          <th>Điện thoại</th>
          <th>Địa chỉ</th>
          <th>Tổng tiền</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
        {orders.map((order) => {
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.phone}</td>
              <td>{order.shippingAddress}</td>
              <td>{order.total}</td>
              <td>
                <Link to={`/admin/order-detail/${order.id}`}>
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
                    onClick={(e) => deleteOrder(order.id)}
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
                  to={`/admin/orders/${currentPage - 1}`}
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
                <Link to={`/admin/orders/${index + 1}`} className="page-link">
                  <span>{index + 1}</span>
                </Link>
              </li>
            ))}
            {currentPage < pages ? (
              <li className="page-item">
                <Link
                  to={`/admin/orders/${currentPage + 1}`}
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
