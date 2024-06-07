import axiosClient from '../axios-client';

export const getColors = async () => {
    try {
        const response = await axiosClient.get("/colors");
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}

export const addColor = async (req: any) => {
    try {
        const response = await axiosClient.post("/addColor", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to add data");
    }
}

export const editColor = async (req: any) => {
    try {
        const response = await axiosClient.put("/updateColor", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to update data");
    }
}

export const deleteColor = async (id: any) => {
    try {
        const response = await axiosClient.delete(`/deleteColor/${id}`);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to delete data");
    }
}
