import { useDispatch, useSelector } from "react-redux"
import CartItem from "./CartItem"
import { CLEAR, TOTAL } from "../../../redux/action/CartAction"
import { Link } from "react-router-dom"

function Cart(){
    const dispatch = useDispatch()
    // Clear cart
    const clearCart = () =>{
        dispatch(CLEAR())
    }

    // Tính tổng tiền
    dispatch(TOTAL())
    // Lấy tổng tiền
    const totalAmount = useSelector((state) => state.cart.totalAmount)

    // Lấy dữ liệu các sản phẩm có trong giỏ hàng
    const getCartData = useSelector((state) => state.cart.carts)

    return (
        <>
            {/* // <!-- Breadcrumb Section Begin --> */}
            <section class="breadcrumb-section set-bg" data-setbg="img/breadcrumb.jpg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <div class="breadcrumb__text">
                                <h2>Shopping Cart</h2>
                                <div class="breadcrumb__option">
                                    <a href="./index.html">Home</a>
                                    <span>Shopping Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* // <!-- Breadcrumb Section End --> */}

        <section class="shoping-cart spad">
            <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="shoping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th class="shoping__product">Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Hiển thị các sản phẩm trong giỏ hàng */}
                                {
                                    getCartData.map((e) => {
                                        return (
                                            <CartItem item={e}></CartItem>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="shoping__cart__btns">
                        <Link to="/shop" class="primary-btn cart-btn">CONTINUE SHOPPING</Link>
                        <button onClick={()=>clearCart()} class="primary-btn cart-btn cart-btn-right">CLEAR CART</button>
                        <button class="primary-btn cart-btn cart-btn-right mr-2">Update Cart</button>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="shoping__continue">
                        <div class="shoping__discount">
                            <h5>Discount Codes</h5>
                            <form action="#">
                                <input type="text" placeholder="Enter your coupon code"/>
                                <button type="submit" class="site-btn">APPLY COUPON</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="shoping__checkout">
                        <h5>Cart Total</h5>
                        <ul>
                            <li>Subtotal <span>${totalAmount}</span></li>
                            <li>Total <span>${totalAmount}</span></li>
                        </ul>
                        <Link to="/checkout" class="primary-btn">PROCEED TO CHECKOUT</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    )
}

export default Cart