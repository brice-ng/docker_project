import axios from "axios";


export class CategorieService{

    rootURL = `${process.env.api}categorie/`;

    constructor() {

    }

    async getList(id_evenement:any): Promise<any[]> {
        const response = await axios.get(`${(this.rootURL)}/all/${id_evenement}`);
        return response.data;
    }

    create(data: any){
        return '';
    }





}
