import cate1 from '../../../assets/img/categories/cat-1.jpg'
import cate2 from '../../../assets/img/categories/cat-2.jpg'
import cate3 from '../../../assets/img/categories/cat-3.jpg'
import cate4 from '../../../assets/img/categories/cat-4.jpg'
import cate5 from '../../../assets/img/categories/cat-5.jpg'

function Categories() {
    return (
        <section className="categories">
            <div className="container">
                <div className="row">
                    <div className="categories__slider owl-carousel">
                        <div className="col-lg-3">
                            <div style={{backgroundImage:"{cate1}"}} className="categories__item set-bg" data-setbg={cate1}>
                                <h5><a href="#">Fresh Fruit</a></h5>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="categories__item set-bg" data-setbg={cate2}>
                                <h5><a href="#">Dried Fruit</a></h5>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="categories__item set-bg" data-setbg={cate3}>
                                <h5><a href="#">Vegetables</a></h5>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="categories__item set-bg" data-setbg={cate4}>
                                <h5><a href="#">drink fruits</a></h5>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="categories__item set-bg" data-setbg={cate5}>
                                <h5><a href="#">drink fruits</a></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Categories