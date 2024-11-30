import axiosInstance from "./axios";

const apiBrand = {
  // Lấy tất cả Brand
  getAll: () => {
    return axiosInstance.get("/brands").then((res) => res.data);
  },

  // get brands pagination
  getBrandPagination: (page, pageSize) => {
    return axiosInstance
      .get(`/brands?pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
      .then((res) => res.data);
  },

  // delete brand by id
  delBrandById: (id) => {
    return axiosInstance.delete(`/brands/${id}`);
  },

  // get brand by slug
  getBrandBySlug: (slug) => {
    return axiosInstance
      .get(`/brands?filters[slug][$eq]=${slug}`)
      .then((res) => res.data);
  },

  getBrandByCatSlug: (slug) => {
    return axiosInstance
      .get(`/brands?populate=*&filters[categories][slug][$eq]=${slug}`)
      .then((res) => res.data)
  },

  // add brand
  createBrand: (brand) => {
    return axiosInstance.post("/brands", brand);
  },

  // Update Brand
  updateBrand: (id, brand) => {
    return axiosInstance.put(`/brands/${id}`, brand);
  },
};

export default apiBrand