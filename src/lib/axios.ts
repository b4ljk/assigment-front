import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers"),
      token = cookies().get("token")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Check if the response status is 401 Unauthorized
//     if (error.response && error.response.status === 401) {
//       if (!isServer) {
//         // Delete the access_token from local storage
//         localStorage.removeItem("access_token");
//       }
//       // Optionally, you can redirect the user to a login page or perform other actions
//     }
//     // Return Promise.reject to keep the error flowing
//     return Promise.reject(error);
//   }
// );

export default api;
