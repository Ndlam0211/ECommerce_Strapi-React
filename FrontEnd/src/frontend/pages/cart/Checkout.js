import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { imageURL } from "../../../api/config";
import { getUserData } from "../../../helpers";
import apiOrder from "../../../api/apiOrder";
import { CLEAR, TOTAL } from "../../../redux/action/CartAction";
import apiOrderDetail from "../../../api/apiOrderDetail";

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // Lấy dữ liệu của user nếu có
  const user = getUserData();

  const [username,setUsername] = useState("")
  const [address,setAddress] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [userId,setUserId] = useState(0)

  // Tính tổng tiền
  dispatch(TOTAL())
  // Lấy tổng tiền
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  // Lấy dữ liệu các sản phẩm có trong giỏ hàng
  const getCartData = useSelector((state) => state.cart.carts);

  useEffect(() => {
    // Nếu chưa đăng nhập thì navigate qua login
    if (!user) {
      toast.info("you need to login to checkout", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
      return
    }

    setUsername(user.userData.username)
    setAddress(user.userData.address)
    setEmail(user.userData.email)
    setPhone(user.userData.phone)
    setUserId(user.userData.id)
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault()

    const orderData = {
      user_id: userId,
      customer_name:username, 
      phone: phone,
      email: email,
      shipping_address: address,
      total: totalAmount,
    };

    try {
      // Thực hiện thanh toán
      const response = await apiOrder.createOrder({ data: orderData });

      // Thực hiện thêm các record vào bảng order_detail
      // Mỗi product sẽ là một record
      getCartData.forEach((element) => {
        const orderDetailData = {
          order_id: response.data.data.id,
          product_id: element.id,
          quantity: element.quantity,
          buy_price: element.price,
        }

        const res = apiOrderDetail.createOrderDetail({data: orderDetailData})
      });

      dispatch(CLEAR())

      // Thông báo cho người dùng
      toast.info(`Checkouted successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      // Thông báo cho người dùng nếu lỗi xảy ra
      toast.error(
        `Failed to checkout: ${error.response.data.error.details.errors[0].message}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  }


  return (
    <>
      {/* <!-- Breadcrumb Section Begin --> */}
      <section
        className="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Organi Shop</h2>
                <div className="breadcrumb__option">
                  <Link to="/">Home</Link>
                  <span>Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Breadcrumb Section End --> */}

      <section class="checkout spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h6>
                <span class="icon_tag_alt"></span> Have a coupon?{" "}
                <a href="#">Click here</a> to enter your code
              </h6>
            </div>
          </div>
          <div class="checkout__form">
            <h4>Billing Details</h4>
            <form onSubmit={handleCheckout}>
              <div class="row">
                <div class="col-lg-4 col-md-6">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="checkout__input">
                        <p>
                          User Name<span>*</span>
                        </p>
                        <input
                          className="form-control"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__input">
                    <p>
                      Address<span>*</span>
                    </p>
                    <input
                      className="form-control"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      class="checkout__input__add"
                    />
                  </div>
                  <div class="checkout__input">
                    <p>
                      Phone<span>*</span>
                    </p>

                    <input
                      className="form-control"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div class="checkout__input">
                    <p>
                      Email<span>*</span>
                    </p>
                    <input
                      className="form-control"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div class="col-lg-8 col-md-6">
                  <div class="checkout__order">
                    <h4>Your Order</h4>
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
                          {/* Hiển thị các sản phẩm trong giỏ hàng */}
                          {getCartData.map((item) => {
                            return (
                              <tr>
                                <td class="shoping__cart__item">
                                  <img
                                    src={imageURL + item.image}
                                    alt={item.name}
                                  />
                                  <h5>{item.name}</h5>
                                </td>
                                <td class="shoping__cart__price">
                                  ${item.price}
                                </td>
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
                    <div class="checkout__order__subtotal">
                      Subtotal <span>${totalAmount}</span>
                    </div>
                    <div class="checkout__order__total">
                      Total <span>${totalAmount}</span>
                    </div>
                    <button type="submit" class="site-btn">
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default Checkout;
