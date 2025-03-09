import axiosInstance from "@/app/helpers/axiosInstance";
import axios from "axios";


class ReservationService{

    rootURL = `billet`;
    rootURL2 = `http://localhost:1337/api/billet`

    constructor() {

    }

    async getReservationByEvenementId(id:any): Promise<any[]> {
        const response = await axiosInstance.get(`${this.rootURL}/liste/${id}`);
        return response.data;
    }



    async reserver(data: any) {
        const response = await axios.post(`${(this.rootURL2)}/reserver`, data);
        return response.data;
    }




}

// Exporter une instance unique de la classe
export const reservationService = new ReservationService();
