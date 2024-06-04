import axiosClient from '../axios-client';

export const getBrands = async () => {
    try {
        const response = await axiosClient.get("/brands");
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}

export const addBrand = async (req: any) => {
    try {
        const response = await axiosClient.post("/addBrand", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to add data");
    }
}

export const editBrand = async (req: any) => {
    try {
        const response = await axiosClient.put("/updateBrand/", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to update data");
    }
}

export const deleteBrand = async (id: any) => {
    try {
        const response = await axiosClient.delete(`/deleteBrand/${id}`);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to delete data");
    }
}
