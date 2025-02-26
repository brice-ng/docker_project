
import axios from "axios";
import {UserHelper} from "@/app/helpers/user";

// Créer une instance Axios
const axiosInstance = axios.create({
    baseURL: "http://localhost:1337/api", // Remplace par l'URL de ton API
});

// Ajouter un intercepteur de requêtes pour injecter le token automatiquement
axiosInstance.interceptors.request.use(
    (config) => {

        const user = UserHelper.getUser();
        const token = user.token; // Récupérer le token depuis les cookies
        console.log(user);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Ajouter un intercepteur de réponse pour gérer les erreurs globalement
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401 && typeof window !== "undefined") {
            console.warn("Token expiré ou non valide !");
            // Gérer l'expiration du token (ex: redirection vers login)

            //router.push('/auth/login');
            window.location.href = "/auth/login";

        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
