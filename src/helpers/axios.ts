import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://192.168.16.86:4001/api",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.response.use(
  res => {
    return Promise.resolve(res.data)
  },
  error => {
    if (!error) return

    let errorData = error

    if (
      typeof error.response !== "undefined" &&
      typeof error.response.data !== "undefined"
    ) {
      errorData = error.response.data
    }

    return Promise.reject(errorData)
  },
)

export default axiosInstance
