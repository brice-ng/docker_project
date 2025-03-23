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


    async printReservationBillet(id:any) {
        //const response = await axiosInstance.get(`${this.rootURL}/liste/${id}`);
/*
        const response = await axios.get<Blob>(`${(this.rootURL2)}/imprimer/${id}`, {
            responseType: 'blob', // Important pour traiter les fichiers binaires
        });
*/

        // Créer une URL pour le blob
        const url = `${this.rootURL2}/imprimer/${id}`;
        //console.log(url)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'billet.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        //return response.data;
    }



}

// Exporter une instance unique de la classe
export const reservationService = new ReservationService();
