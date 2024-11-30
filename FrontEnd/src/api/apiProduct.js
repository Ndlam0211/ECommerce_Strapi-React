import axiosInstance from "./axios";

const apiProduct = {
    // Lấy tất cả sản phẩm
    getAll: () => {
        return axiosInstance.get("/products?populate=*").then((res) => res.data);
    },

    // Lấy 3 sản phẩm mới nhất
    get3LastestProduct: () =>{
        return axiosInstance.get("/products?populate=*&sort[0]=createdAt:desc&pagination[limit]=3").then((res) => res.data);
    },

    // Lấy 3 sản phẩm khuyến mãi
    get3SaleOffProduct: () =>{
        return axiosInstance.get("/products?populate=*&filters[is_on_sale][$eq]=true&pagination[limit]=3").then((res) => res.data);
    },

    // Lấy sản phẩm theo slug
    getProductBySlug: (slug) => {
        return axiosInstance.get(`/products?populate=*&filters[slug][$eq]=${slug}`).then((res) => res.data);
    },

    // Lấy sản phẩm theo Cat slug
    getProductByCatSlug: (slug) => {
        return axiosInstance.get(`/products?populate=*&filters[category][slug][$eq]=${slug}`).then((res) => res.data)
    },

    // Lấy sản phẩm theo id
    getProductById: (id) => {
        return axiosInstance.get(`/products?populate=*&filters[id]=${id}`).then((res) => res.data)
    },

    // Lấy sản phẩm phân trang
    getProductPagination: (page,pageSize) => {
        return axiosInstance
          .get(
            `/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
          )
          .then((res) => res.data);
    },

    getProductByQuery: (query) => {
        return axiosInstance
            .get(`/products?populate=*&${query}`)
            .then((res) => res.data)
    },

    // Thêm sản phẩm
    createProduct: (product) => {
        return axiosInstance
            .post("/products", product)
    },

    // Xóa sản phẩm theo id
    deleteProductById: (id) => {
        return axiosInstance
            .delete(`/products/${id}`)
    },

    // Update product
    updateProduct: (id,product) => {
        return axiosInstance
            .put(`/products/${id}`,product)
    },
}

export default apiProduct