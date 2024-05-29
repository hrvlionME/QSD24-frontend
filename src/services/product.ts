import axiosClient from '../axios-client';

export const getProduct = async (id: number) => {
  try {
    const response = await axiosClient.get(`/getProduct/${id}`);
    return response.data;
  }
  catch (error: any) {
    if (error.response) throw new Error(error.response.data.message);
    else if (error.request) throw new Error("No response received from server");
    else throw new Error("Product fetch failed");
  }
}

