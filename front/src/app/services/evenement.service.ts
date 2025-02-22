import axios from "axios";
import axiosInstance from "@/app/helpers/axiosInstance";


class EvenementService{

    rootURL = `evenement`;

    constructor() {

    }

    async get(): Promise<any[]> {
        const response = await axiosInstance.get(`${this.rootURL}`);
        return response.data;
    }

    async getByid(id:any): Promise<any[]> {
        const response = await axiosInstance.get(`${(this.rootURL)}/${id}`);
        return response.data;
    }

    async demarrer(id:any): Promise<any[]> {
        const response = await axiosInstance.get(`${(this.rootURL)}/start/${id}`);
        return response.data;
    }

    async cloturer(id:any): Promise<any[]> {
        const response = await axiosInstance.get(`${(this.rootURL)}/end/${id}`);
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
export const evenementService = new EvenementService();
