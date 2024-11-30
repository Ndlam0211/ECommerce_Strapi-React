import Hero from './contents/Hero'
import Categories from './contents/Categories'
import Featured from './contents/Featured'
import Banner from './contents/Banner'
import LastestProduct from './contents/LastestProduct'
import Blog from './contents/Blog'

function Home(){
    return(
        <>
            {/* <!-- Hero Section Begin --> */}
             <Hero/>
            {/* <!-- Hero Section End --> */}

            {/* <!-- Categories Section Begin --> */}
            <Categories/>
            {/* <!-- Categories Section End --> */}

            {/* <!-- Featured Section Begin --> */}
            <Featured/>
            {/* <!-- Featured Section End --> */}

            {/* <!-- Banner Begin --> */}
            <Banner/>
            {/* <!-- Banner End --> */}

            {/* <!-- Latest Product Section Begin --> */}
            <LastestProduct/>
            {/* <!-- Latest Product Section End --> */}

            {/* <!-- Blog Section Begin --> */}
            <Blog/>
            {/* <!-- Blog Section End --> */}
        </>
    )
}

export default Home