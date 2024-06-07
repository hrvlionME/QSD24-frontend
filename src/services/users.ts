import axiosClient from "../axios-client";

export const getUser = async (id: number) => {
  try {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Failed to get data");
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosClient.get("/users");
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Failed to get data");
  }
};


export const editUser = async (userData: any) => {
  try {
    const response = await axiosClient.put("/api/users", userData);
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Failed to update data");
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Failed to delete user");
  }
};
