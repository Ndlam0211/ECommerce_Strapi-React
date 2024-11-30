import './assets/css/style.css'
import './assets/css/bootstrap.min.css'
import './assets/css/elegant-icons.css'
import './assets/css/font-awesome.min.css'
import './assets/css/nice-select.css'
import './assets/css/jquery-ui.min.css'
import './assets/css/owl.carousel.min.css'
import './assets/css/slicknav.min.css'
import Preloader from './partial/Preloader'
import Humberger from './partial/Humberger'
import Header from './partial/Header'
import Footer from './partial/Footer'
import Hero from './partial/Hero'
import { Outlet, useLocation } from 'react-router-dom'

function Index() {
    const location = useLocation();

    // Kiểm tra nếu địa chỉ URL hiện tại là trang cụ thể mà bạn không muốn hiển thị Header
    const hideHeader = location.pathname === '/';
    return (
        <>
            {/* <!-- Page Preloder --> */}
            <Preloader/>

            {/* <!-- Humberger Begin --> */}
            <Humberger/>
            {/* <!-- Humberger End --> */}

            {/* <!-- Header Section Begin --> */}
            <Header/>
            {/* <!-- Header Section End --> */}

            {/* <!-- Hero Section Begin --> */}
            {!hideHeader && <Hero/>}
            {/* <!-- Hero Section End --> */}

            {/* <!-- Body --> */}
            <Outlet/>
            {/* <!-- Body --> */}
           
            {/* <!-- Footer Section Begin --> */}
            <Footer/>
            {/* <!-- Footer Section End --> */}
        </>
    );
}

export default Index