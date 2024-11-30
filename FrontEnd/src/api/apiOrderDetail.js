import axiosInstance from "./axios";

const apiOrderDetail = {
  // get order detail by order id
  getODsByOrderId: (id) => {
    return axiosInstance
      .get(`/order-details?filters[order_id][$eq]=${id}`)
      .then((res) => res.data);
  },

  // get order detail by product  id
  getODsByProductId: (id) => {
    return axiosInstance
      .get(`/order-details?filters[product_id][$eq]=${id}`)
      .then((res) => res.data)
  },

  // create
  createOrderDetail: (orderDetail) => {
    return axiosInstance.post("/order-details", orderDetail);
  },
};

export default apiOrderDetail;
