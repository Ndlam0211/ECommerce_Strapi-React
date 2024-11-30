import './assets/css/styles.css'
import Header from './partial/Header'
import Sidebar from './partial/Sidebar'

function IndexAdmin() {
    return (
        <>
            {/* <!-- Header Section Begin --> */}
            <Header/>
            {/* <!-- Header Section End --> */}

            {/* <!-- Body --> */}
            <Sidebar/>
            {/* <!-- Body --> */}
        </>
    );
}

export default IndexAdmin