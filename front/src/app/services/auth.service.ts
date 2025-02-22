import axios from "axios";


class AuthService{

    //rootURL = `${process.env.api}auth`;
    rootURL = `http://localhost:1337/api/auth`
    constructor() {

    }


    async login(data: any) {
        const response = await axios.post(`${(this.rootURL)}/login`, data);
        return response.data;
    }

    async register(data: any) {
        const response = await axios.post(`${(this.rootURL)}/signup`, data);
        return response.data;
    }

    async refreshToken(data: any) {
        const response = await axios.post(`${(this.rootURL)}/refresh-token`, data);
        return response.data;
    }


}

// Exporter une instance unique de la classe
export const authService = new AuthService();
