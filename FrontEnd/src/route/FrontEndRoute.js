import Home from '../frontend/pages/home/Home'
import Shop from '../frontend/pages/shop/Shop'
import Blog from '../frontend/pages/blog/Blog'
import Contact from '../frontend/pages/contact/Contact'
import ProductDetail from '../frontend/pages/shop/ProductDetail'
import ProductByCat from '../frontend/pages/shop/ShopByCat'
import Login from '../frontend/pages/user/Login'
import Signup from '../frontend/pages/user/Signup'
import NotFound from '../frontend/pages/NotFound'
import Logout from '../frontend/pages/user/Logout'
import Cart from '../frontend/pages/cart/Cart'
import Checkout from '../frontend/pages/cart/Checkout'


const FrontEndRoute = [
    {"path":"/", "component": Home},
    {"path":"/shop", "component": Shop},
    {"path":"/blog", "component": Blog},
    {"path":"/cart", "component": Cart},
    {"path":"/login", "component": Login},
    {"path":"/logout", "component": Logout},
    {"path":"/signup", "component": Signup},
    {"path":"/contact", "component": Contact},
    {"path":"/checkout", "component": Checkout},
    {"path":"/shop/:slug", "component": ProductByCat},
    {"path":"/product-detail/:slug", "component": ProductDetail},
    {"path":"*","component":NotFound}
]

export default FrontEndRoute