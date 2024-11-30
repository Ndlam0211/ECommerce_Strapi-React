import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiOrder from "../../../api/apiOrder";
import { imageURL } from "../../../api/config";
import apiOrderDetail from "../../../api/apiOrderDetail";
import apiProduct from "../../../api/apiProduct";

export default function OrderDetail() {
  const { id } = useParams();

  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState(false);
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState(0);

  const [orderDetails,setOrderDetails] = useState([])
  const [productsData, setProductsData] = useState([]);

  // useEffect(() => {
  //   apiOrder.getOrderById(id).then((res) => {
  //     try {
  //       const orderAttribute = res.data.attributes;

  //       setOrderId(res.data.id)
  //       setCustomerName(orderAttribute.customer_name)
  //       setStatus(orderAttribute.status)
  //       setTotal(orderAttribute.total);
  //     } catch (error) {
  //       console.log("Failed to get order by id: ", error.message);
  //     }
  //   });
  // }, [id]);

  // useEffect(() => {
  //   apiOrderDetail.getODsByOrderId(orderId).then((res) => {
  //     try {
  //       const orderDetailsData = res.data.map((item) => {
  //         return {
  //           productId: item.attributes.product_id,
  //           price: item.attributes.buy_price,
  //           quantity: item.attributes.quantity,
  //         };
  //       });
  //       setOrderDetails(orderDetailsData);
  //     } catch (error) {
  //       console.log("Error: ", error.message);
  //     }
  //   });
  // }, [orderId]);

  useEffect(() => {
    // Fetch order details
    const fetchOrder = async () => {
      try {
        const orderResponse = await apiOrder.getOrderById(id);
        const order = orderResponse.data;
        const orderAttributes = order.attributes;
        setOrderId(order.id);
        setCustomerName(orderAttributes.customer_name);
        setStatus(orderAttributes.status);
        setTotal(orderAttributes.total);
      } catch (error) {
        console.log("Failed to get order by id: ", error.message);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    // Fetch order details data
    const fetchOrderDetails = async () => {
      try {
        const orderDetailsResponse = await apiOrderDetail.getODsByOrderId(
          orderId
        );
        const orderDetailsData = orderDetailsResponse.data.map((item) => ({
          productId: item.attributes.product_id,
          price: item.attributes.buy_price,
          quantity: item.attributes.quantity,
        }));
        setOrderDetails(orderDetailsData);
      } catch (error) {
        console.log("Error fetching order details: ", error.message);
      }
    };

    if (orderId !== 0) {
      fetchOrderDetails();
    }
  }, [orderId]);

   useEffect(() => {
     // Fetch products data based on order details
     const fetchProductsData = async () => {
       const promises = orderDetails.map(async (item) => {
         try {
           const productResponse = await apiProduct.getProductById(
             item.productId
           );
           const productData = {
             id: productResponse.data[0].id,
             image:
               productResponse.data[0].attributes.image.data.attributes.url,
             name: productResponse.data[0].attributes.product_name,
           };
           return productData;
         } catch (error) {
           console.log("Error fetching product details: ", error.message);
           return null;
         }
       });

       // Wait for all promises to resolve
       Promise.all(promises).then((products) => {
         setProductsData(products.filter((product) => product !== null));
       });
     };

     fetchProductsData();
   }, [orderDetails]);


  return (
    <div>
      <h1 className="mt-4">Order Management</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Order Detail</li>
      </ol>
      <div className="row px-5">
        <div className="col-md-5">
          <form>
            <label>Mã hóa đơn: {orderId}</label><br/>
            <label>Tên khách hàng: {customerName}</label><br/>
            <label>Tình trạng đơn hàng: 
              <select>
                <option value="0">Đang giao</option>
                <option value="1" selected={status ? true : false}>Đã giao</option>
              </select>
            </label><br/>
            <button type="submit" className="btn btn-success" name="submit">
              UPDATE
            </button>
          </form>
        </div>
        <div className="col-md-7">
          <div class="checkout__order">
            <h4>Order Detail</h4>
            <div class="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th class="shoping__product">Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Hiển thị order detail */}
                  {orderDetails.map((item) => {
                    return (
                      <tr>
                      <td class="shoping__cart__item">
                        {
                            productsData.map((product, index) => {
                              if(product.id === item.productId){
                                return (
                                  <div>
                                    <img
                                      src={imageURL + product.image}
                                      alt={product.name}
                                    /><br/>
                                    <h3 className="mt-3">{product.name}</h3>
                                  </div>
                                );
                              }
                            })
                        }
                        </td>
                        <td class="shoping__cart__price">${item.price}</td>
                        <td class="shoping__cart__quantity">
                          <div class="quantity">
                            <div class="pro-qty">
                              <input
                                type="number"
                                placeholder={item.quantity}
                                min="1"
                              />
                            </div>
                          </div>
                        </td>
                        <td class="shoping__cart__total">
                          ${item.price * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div class="checkout__order__total">
              Total <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
