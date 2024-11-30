import logo from '../assets/img/logo.png'
import language from '../assets/img/language.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiCategory from '../../api/apiCategory'
import { useSelector } from 'react-redux'
import { getUserData } from '../../helpers'

function Header() {
    // Lấy dữ liệu trong giỏ hàng
    const getCartData = useSelector((state) => state.cart.carts)

    // Lấy user từ localStorage nếu đã đăng nhập
    const user = getUserData()
    // Set username nếu đã đăng nhập
    if(user){
        var username = user.userData.username
    }
    
    const [categories,setCategories] = useState([])

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
                    }
                })
                setCategories(categoriesData)
            } catch (error) {
                console.log("Error: ",error.message)
            }
        })
    },[])

    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__left">
                                <ul>
                                    <li><i className="fa fa-envelope"></i> hello@colorlib.com</li>
                                    <li>Free Shipping for all Order of $99</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__right">
                                <div className="header__top__right__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-linkedin"></i></a>
                                    <a href="#"><i className="fa fa-pinterest-p"></i></a>
                                </div>
                                <div className="header__top__right__language">
                                    <img src={language} alt="" />
                                    <div>English</div>
                                    <span className="arrow_carrot-down"></span>
                                    <ul>
                                        <li><a href="#">Spanis</a></li>
                                        <li><a href="#">English</a></li>
                                    </ul>
                                </div>
                                <div className="header__top__right__auth">
                                    <i className="fa fa-user"></i> <span className="arrow_carrot-down"></span>
                                    {username}
                                    <ul className='header__top__right__dropdown'>
                                        {user ? (
                                            <li><Link to={'/logout'}><span>Logout</span></Link></li>
                                        ):(
                                            <li><Link to={'/login'}><span>Login</span></Link></li>
                                        )}
                                        <li><Link to={'/signup'}><span>Signup</span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="header__logo">
                            <a href="./index.html"><img src={logo} alt="" /></a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><Link to='/'>Home</Link></li>
                                <li><Link to='/shop'>Shop</Link>
                                    <ul className="header__menu__dropdown">
                                        {
                                            categories.map((category,index) => {
                                                return (
                                                    category.parent === 0 ? (
                                                        <li className={`${(category.hasChild)?'submenu':''}`} key={index}><Link to={`/shop/${category.slug}`}>{category.name}</Link>
                                                            <ul className="header__menu__dropdown2">
                                                                {
                                                                    categories.map((cate,index) => {
                                                                        return (
                                                                            cate.parent === category.id ? (
                                                                                <li key={index}><Link to={`/shop/${cate.slug}`}>{cate.name}</Link></li>
                                                                            ): null
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </li>
                                                    ):null
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                                <li><a href="#">Pages</a>
                                    <ul className="header__menu__dropdown">
                                        <li><a href="./shop-details.html">Shop Details</a></li>
                                        <li><Link to="/cart">Shoping Cart</Link></li>
                                        <li><a href="./checkout.html">Check Out</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                    </ul>
                                </li>
                                <li><Link to='/blog'>Blog</Link></li>
                                <li><Link to='/contact'>Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
                                <li><Link to='/cart'><i className="fa fa-shopping-cart"></i> {getCartData.length !==0?<span>{getCartData.length}</span>:""}</Link></li>
                            </ul>
                            <div className="header__cart__price">item: <span>$150.00</span></div>
                        </div>
                    </div>
                </div>
                <div className="humberger__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
    )
}

export default Header