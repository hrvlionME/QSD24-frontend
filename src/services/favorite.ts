import axiosClient from '../axios-client';

export const getFavorites = async () => {
    try {
        const response = await axiosClient.get("/getFavorites");
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}


export const handleFavorite = async () => {
    try {
        const response = await axiosClient.get("/handleFavorite");
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}