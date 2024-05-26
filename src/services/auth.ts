import axiosClient from '../axios-client';

export const register = async (req: any) => {
  try {
    const response = await axiosClient.post("/register", req);
    return response.data;
  }
  catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Registration failed");
  }
}

export const login = async (req: any) => {
  try {
    const response = await axiosClient.post("/login", req);
    return response.data;
  }
  catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Login failed");
  }
}
