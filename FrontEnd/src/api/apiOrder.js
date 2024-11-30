import axiosInstance from "./axios"

const apiOrder = {
    // get lastest order
    getLastestOrder: () => {
        return axiosInstance.get("/orders?sort[0]=createdAt:desc&pagination[limit]=1").then((res) => res.data);
    },

    // get order pagination
    getOrderPagination: (page,pageSize) => {
        return axiosInstance.get(`/orders?pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
            .then((res) => res.data)
    },

    // get order by id
    getOrderById: (id) => {
        return axiosInstance.get(`/orders/${id}`).then((res) => res.data)
    },

    // create order
    createOrder: (order) => {
        return axiosInstance.post("/orders",order)
    },

    // delete order by id
    delOrderById: (id) => {
        return axiosInstance.delete(`/orders/${id}`)
    },
}

export default apiOrder