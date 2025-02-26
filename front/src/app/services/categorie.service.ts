import axios from "axios";
import axiosInstance from "@/app/helpers/axiosInstance";


class CategorieService{

    rootURL = `categorie`;

    constructor() {

    }

    async get(event_id:any): Promise<any[]> {
        const response = await axiosInstance.get(`${this.rootURL}/all/${event_id}`);
        return response.data;
    }

    async getByid(id:any): Promise<any[]> {
        const response = await axiosInstance.get(`${(this.rootURL)}/${id}`);
        return response.data;
    }

    async save(data: any) {
        const response = await axiosInstance.post(`${(this.rootURL)}/save`, data);
        return response.data;
    }

    async update(data: any,id:any) {
        const response = await axiosInstance.put(`${(this.rootURL)}/update/${id}`, data);
        return response.data;
    }

    async delete(id: number) {
        await axiosInstance.delete(`${(this.rootURL)}/${id}`);
    }

}

// Exporter une instance unique de la classe
export const categorieService = new CategorieService();
