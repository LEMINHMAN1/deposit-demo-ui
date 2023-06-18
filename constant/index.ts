import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_URL"]
});

export const axiosInstanceNoInterceptor = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_URL"]
});


let axiosResInterceptor: number = -1;
export function applyResponseIntercepter() {
  if (axiosResInterceptor === -1) {
    axiosResInterceptor = axiosInstance.interceptors.response.use((response: any) => response, (error: any) => {
      const { data, status } = error?.response;
      if (status === 401 && data === "Unauthorized") {
        const refreshToken = localStorage.getItem("refreshToken");
        const user: any = JSON.parse(localStorage.getItem("user") || "");
        if (!user?.email) {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          location.reload();
        }
        axiosInstanceNoInterceptor.post("/token", { refreshToken, email: user?.email })
          .then(res => {
            const { accessToken } = res?.data;
            localStorage.setItem("accessToken", accessToken);
          })
          .catch(err => {
            console.log(err)
          })
      } else throw new Error(error?.response?.data || "Something went wrong")
    });
  }
}


let axiosReqInterceptor: number = -1;
export function applyRequestIntercepter() {
  if (axiosReqInterceptor === -1) {
    axiosReqInterceptor = axiosInstance.interceptors.request.use((config: any) => {
      const accessTokenFromStorage = localStorage.getItem("accessToken")
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${accessTokenFromStorage}`
      }
      config["headers"] = headers;
      return config;
    });
  }
}