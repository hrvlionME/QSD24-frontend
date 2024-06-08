import axiosClient from '../axios-client';

export const getProducts = async () => {
    try {
        const response = await axiosClient.get("/getProducts");
        return response.data.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}

export const addProduct = async (req: any) => {
    try {
        const response = await axiosClient.post("/addProduct", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to add data");
    }
}

export const editProduct = async (req: any) => {
    try {
        const response = await axiosClient.put("/updateProduct/", req);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to update data");
    }
}

export const deleteProduct = async (id: any) => {
    try {
        const response = await axiosClient.delete(`/deleteProduct/${id}`);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to delete data");
    }
}

export const filterProducts = async (minPrice: any, maxPrice: any, selectedCategories: any, selectedBrands: any, selectedSizes: any, selectedColors: any, category: any) => {
    try {
        let route: string;
        let gender: number;
        if (category === "men") gender = 1;
        else if (category === "women") gender = 2;
        else if (category === "children") gender = 3;
        else gender = 0;
        if (gender === 0) route = `/filterProducts?min_price=${minPrice}&max_price=${maxPrice}`;
        else route = `/filterProducts?genders[]=${gender}&min_price=${minPrice}&max_price=${maxPrice}`;
        for (let item of selectedCategories) route += `&categories[]=${item}`;
        for (let item of selectedBrands) route += `&brands[]=${item}`;
        for (let item of selectedSizes) route += `&sizes[]=${item}`;
        for (let item of selectedColors) route += `&colors[]=${item}`;
        const response = await axiosClient.get(route);
        return response.data;
    }
    catch (error: any) {
        if (error.response) throw new Error(error.response.data.message);
        else if (error.request) throw new Error("No response received from server");
        else throw new Error("Failed to get data");
    }
}
