import Dashboard from "../backend/pages/Dashboard"
import NotFound from "../backend/pages/NotFound"
import BrandAdd from "../backend/pages/brand/BrandAdd"
import BrandEdit from "../backend/pages/brand/BrandEdit"
import BrandList from "../backend/pages/brand/BrandList"
import CategoryAdd from "../backend/pages/category/CategoryAdd"
import CategoryEdit from "../backend/pages/category/CategoryEdit"
import CategoryList from "../backend/pages/category/CategoryList"
import OrderDetail from "../backend/pages/order/OrderDetail"
import OrderList from "../backend/pages/order/OrderList"
import ProductAdd from "../backend/pages/product/ProductAdd"
import ProductEdit from "../backend/pages/product/ProductEdit"
import ProductList from "../backend/pages/product/ProductList"
import UserDetail from "../backend/pages/user/UserDetail"
import UserList from "../backend/pages/user/UserList"

const BackEndRoute = [
    {"path": "/", "component": Dashboard},
    {"path": "/admin/category/:page", "component": CategoryList},
    {"path": "/admin/category-add", "component": CategoryAdd},
    {"path": "/admin/category-edit/:id", "component": CategoryEdit},
    {"path": "/admin/products/:page", "component": ProductList},
    {"path": "/admin/product-add", "component": ProductAdd},
    {"path": "/admin/product-edit/:slug", "component": ProductEdit},
    {"path": "/admin/users", "component": UserList},
    {"path": "/admin/user-detail/:id", "component": UserDetail},
    {"path": "/admin/brands/:page", "component": BrandList},
    {"path": "/admin/brand-edit/:slug", "component": BrandEdit},
    {"path": "/admin/brand-add", "component": BrandAdd},
    {"path": "/admin/orders/:page", "component": OrderList},
    {"path": "/admin/order-detail/:id", "component": OrderDetail},
    // {"path": "/admin/login", "component": Login},
    {"path": "*", "component": NotFound},
]

export default BackEndRoute