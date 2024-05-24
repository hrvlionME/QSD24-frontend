import axiosClient from "../axios-client";

export const register = async (req: any) => {
    try {
        console.log(req);
        const response = await axiosClient.post("/register", req);
        return response.data;
      } catch (error : any) {
        if (error.response) {
          throw new Error(error.response.data.message || 'Registration failed');
        } else if (error.request) {
          throw new Error('No response received from server');
        } else {
          throw new Error('Registration failed');
        }
      }
}