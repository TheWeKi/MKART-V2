import baseUrl from "./configuration/baseUrl.ts";

export const getAllProducts = async () => {
    try {
        const response = await baseUrl.get("/products");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}