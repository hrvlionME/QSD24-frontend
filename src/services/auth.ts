import axiosClient from "../axios-client";

export const register = async (req: any) => {
    return axiosClient.post("/register", {...req});
}