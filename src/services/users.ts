import axiosClient from '../axios-client';

export const getUser = async (id: number) => {
    try {
        const response = await axiosClient.get(`/getUser/${id}`);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}

export const editUser = async (req: any) => {
    try {
        const response = await axiosClient.put("/updateUser/", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to update data");
    }
}
