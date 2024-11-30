import axiosInstance from "./axios";

const apiCategory = {
  // Lấy tất cả Category
  getAll: () => {
    return axiosInstance.get("/categories").then((res) => res.data);
  },

  // Lấy Category theo slug
  getCategoryBySlug: (slug) => {
    return axiosInstance
      .get(`/categories?filters[slug][$eq]=${slug}`)
      .then((res) => res.data);
  },

  // Thêm category
  createCategory: (category) => {
    return axiosInstance.post(`/categories`, category);
  },

  // Lấy 1 category
  getCategoryById: (id) => {
    return axiosInstance.get(`/categories/${id}`);
  },

  // Sửa category
  editCategory: (id, category) => {
    return axiosInstance.put(`/categories/${id}`, category);
  },

  // Xóa category
  delCategoryById: (id) => {
    return axiosInstance.delete(`/categories/${id}`);
  },

  // Lấy category có phân trang
  getCatePagination: (page, pageSize) => {
    return axiosInstance
      .get(
        `/categories?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
      )
      .then((res) => res.data);
  }
};

export default apiCategory