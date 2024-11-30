import axios from 'axios'
import axiosInstance from './axios'

const apiUser =  {
    // create user
    createUser: (data) => {
        return axiosInstance.post("/auth/local/register",data)
    },

    // login 
    loginUser: (data) => {
        return axiosInstance.post("/auth/local",data)
    },

    // login admin
    loginAdmin: (data) => {
        return axios
          .create({
            baseURL: "http://localhost:1337/",
            timeout: 1000,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .post("/admin/login", data);
    },

    // get all user
    getAll: () => {
        return axiosInstance.get("/users").then((res) => res.data)
    },

    // get user by id
    getUserById: (id) => {
      return axiosInstance.get(`/users/${id}`).then((res) => res.data)  
    },

    // delete user by id
    delUserById: (id) => {
        return axiosInstance.delete(`/users/${id}`)
    },
}

export default apiUser