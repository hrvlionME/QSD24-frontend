import axiosClient from '../axios-client';

export const getSizes = async () => {
    try {
        const response = await axiosClient.get("/sizes");
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}

export const addSize = async (req: any) => {
    try {
        const response = await axiosClient.post("/addSize", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}

export const editSize = async (req: any) => {
    try {
        const response = await axiosClient.put("/updateSize", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}

export const deleteSize = async (id: any) => {
    try {
        const response = await axiosClient.delete(`/deleteSize/${id}`);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}
