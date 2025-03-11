import {Categorie} from "@/app/types/categorie";
import {TotalCategorie} from "@/app/types/totalCategorie";

export interface InfoEvenement {
    id: number;
    libelle: string;
    lieu: string;
    nbplace: number;
    date_limite: string;
    date_evenement: string;
    description: string;
    updatedAt: number;
    statut:string;
    user:number;
    Categories:Categorie[];
    total:number;
    total_categories:TotalCategorie
}
