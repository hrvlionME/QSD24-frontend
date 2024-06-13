import axiosClient from "../axios-client";

export const getUser = async (id: number) => {
  try {
    const response = await axiosClient.get(`/getUser/${id}`);
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
    const response = await axiosClient.put("/updateUser", userData);
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Failed to update data");
  }
};

export const updateRole = async (userData: any) => {
  try {
    const response = await axiosClient.put("/updateRole", userData);
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Failed to update data");
  }
};

export const banUser = async (userData: any) => {
  try {
    const response = await axiosClient.post("/banUser", userData);
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Failed to change user status");
  }
};


export const deleteUser = async (id: number) => {
  try {
    const response = await axiosClient.delete("/deleteUser/", { params: { id: id } });
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Failed to delete user");
  }
};
