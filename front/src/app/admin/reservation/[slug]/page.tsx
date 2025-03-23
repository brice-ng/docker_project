'use client';

import { Button } from 'primereact/button';
import Aside from "@/app/components/aside";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import { DataTable } from 'primereact/datatable';
import {useEffect, useRef, useState} from "react";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {Dialog} from "primereact/dialog";
import Form from "next/form";
import { useForm, Controller } from "react-hook-form";
import {Calendar} from "primereact/calendar";
import {UserHelper} from "@/app/helpers/user";
import {evenementService} from "@/app/services/evenement.service";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog';
import {useParams, useRouter} from "next/navigation";
import {categorieService} from "@/app/services/categorie.service";
import {reservationService} from "@/app/services/reservation.service";
import {Dropdown} from "primereact/dropdown";
import {InfoEvenement} from "@/app/types/infoEvenement";
import {io} from "socket.io-client"; // For confirmDialog method


export default function reservationByEvent() {


    const socket = io("http://localhost:1337", {
        transports: ['websocket'],
        extraHeaders: {
            Origin: 'http://localhost:4100', // Assure-toi que l'origine correspond à celle que tu as définie
        },
    });

    const [reservations=[], setReservation] = useState([]);
    const param = useParams();
    const event_id = param.slug;



    let event = {
        id:0,
        libelle: "",
        lieu: "",
        nbplace: 0,
        date_limite: "",
        date_evenement: "",
        description: "",
        total:0,
        Categories:[{
            createdAt: 1740318108455,
            updatedAt: 1740318108455,
            id: 3,
            libelle: "",
            nbplace: 0,
            montant: 0,
            devise: "euro",
            description: "",
            evenement: 0
        }],

        total_categories:[
            {
                "categorie_id": 0,
                "categorie": "",
                "nombre_reserver": 0
            }
        ]
    }


    const [evenement=[], setEvenement] = useState(event);

    const [stat, setStat] = useState({totalR:0,totalB:0,montant:0});

    /*
        [
            {
                "categorie_id": 3,
                "categorie": "One master",
                "nombre_reserver": 9
            }
        ]
     */

    //const [evenement=[], setEvenement] = useState<InfoEvenement>({});

    let style={
        iconField: {
            root: {
                style: { width: "100%" },
            },
        },
        input: {
            style: { width: "100%" },
        },
        root: {
            style: { width: "100%" },
        },
    };

    const router = useRouter()
    const toast = useRef(null);
    const user = UserHelper.getUser();


    const loadDatas = async () => {
        console.log("load reservation");
        //console.log(event_id)

        reservationService.getReservationByEvenementId(event_id).then(dataR=>{
            if(dataR){
                setReservation(dataR);
                evenementService.getInfoById(event_id).then(data=>{
                    console.log(data);
                    setEvenement(data);
                    setStat({...stat,totalB:data.total ,totalR: dataR.length,montant:dataR.reduce((sum, reserv) => sum + reserv.montant, 0)});
                });

            }

            console.log("ticketBought_"+event_id);
            socket.on("ticketBought_"+event_id, (dataResult) => {

                console.log(dataResult)
                console.log("ticketBought event")
                //console.log(data)
                //setNbplace(nombrePlace-data.billets.length)
                console.log("length =>"+dataResult.billets.length)
                let totalR = stat.totalR + 1;
                let totalB = stat.totalB;
                let montant = stat.montant;

                setStat(prevStat => ({
                    ...prevStat,
                    totalR: prevStat.totalR + 1
                }));

                let categorieId = dataResult.billets.map(x=>x.categorie)[0];
                console.log("montant");
                console.log(dataResult.montant);
                console.log(categorieId)
                for(let i=0;i<dataResult.billets.length;i++){
                    //let nb = nbrPlace-1;
                    console.log('bought')
                    setStat(prevStat => ({
                        ...prevStat,
                        totalB: prevStat.totalB + 1
                    }));
                    setStat(prevStat => ({
                        ...prevStat,
                        montant: prevStat.montant + dataResult.montant
                    }));
                }

                toast.current.show({ severity: 'info', summary: 'Message', detail: 'Réservation effectué ',life: 5000 });

            });

            return () => {
                socket.off("ticketBought_"+event_id);
            };
        });




    };


    useEffect(() => {
        //console.log("les uses effects")
        loadDatas();
    }, []);


    const getMontantByCategorieId = (id: number) => {
        //const categorie = evenement.Categories.find(cat => cat.id == id);

        for(let i=0;i<evenement.Categories.length;i++){

            console.log("cat")
            if(evenement.Categories[i].id){
                console.log(evenement.Categories[i]);

            }
        }

        return 0;
    };

    const dateEventBodyTemplate = (rowData) => {
        const formattedDate = format(new Date(rowData.evenement.date_evenement), "dd/MM/yyyy HH:mm", { locale: fr });
        //console.log(formattedDate);
        return (
            <span>{formattedDate}</span>
        );
    };

    const createDateBodyTemplate = (rowData) => {
        const formattedDate = format(new Date(rowData.createdAt), "dd/MM/yyyy HH:mm", { locale: fr });
        //console.log(formattedDate);
        return (
            <span>{formattedDate}</span>
        );
    };



    const actionTemplate = (rowData) => {

        return (
            <>
                <Button icon="pi pi-chevron-circle-down"  rounded text severity="primary" />
                <Button icon="pi pi-play" rounded text severity="success" />
            </>
        );
    };


    return (
        <>
            <Toast ref={toast}/>
            <ConfirmDialog />
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* Menu */}
                    <Aside/>
                    {/* / Menu */}
                    {/* Layout container */}
                    <div className="layout-page">
                        {/* Navbar */}
                        <Nav/>
                        {/* / Navbar */}
                        {/* Content wrapper */}
                        <div className="content-wrapper">
                            {/* Content */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <Card className="text-center">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <i className="icon-admin pi pi-globe text-primary"></i>
                                                </div>
                                                <div className="col-lg-8">
                                                    <h5>Total réservation</h5>
                                                    <h6>{stat.totalR}</h6>
                                                </div>
                                            </div>

                                        </Card>
                                    </div>

                                    <div className="col-lg-4">
                                        <Card className="text-center">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <i className="icon-admin pi pi-check-square text-primary"></i>
                                                </div>
                                                <div className="col-lg-8">
                                                    <h5>Billets réservés</h5>
                                                    <h6>{stat.totalB}</h6>
                                                </div>
                                            </div>

                                        </Card>
                                    </div>


                                    <div className="col-lg-4">
                                        <Card className="text-center">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <i className="icon-admin pi pi-money-bill text-primary"></i>
                                                </div>
                                                <div className="col-lg-8">
                                                    <h5>Montant total</h5>
                                                    <h6>{stat.montant} €</h6>
                                                </div>
                                            </div>

                                        </Card>
                                    </div>


                                    <div className="col-lg-6 mt-4">
                                        <Card subTitle="Billets reservés par catégorie">
                                            <table style={{width: '100%'}}>
                                                <tbody>
                                                    {evenement.total_categories.map((item)=> (
                                                        <tr key={item.categorie_id}>
                                                            <td><i className="text-primary">{item.categorie}</i></td>
                                                            <td>{item.nombre_reserver}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </Card>
                                    </div>

                                    <div className="d">

                                    </div>

                                </div>

                                <div className="row mt-4">
                                    <Card>
                                        <DataTable value={reservations} scrollable paginator rows={5}
                                                   rowsPerPageOptions={[5, 10, 25]} tableStyle={{minWidth: '50rem'}}
                                                   columnResizeMode="expand" resizableColumns
                                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                   emptyMessage="Pas de reservation sauvegardé."
                                                   currentPageReportTemplate="Affiche {first} to {last} sur {totalRecords} entrées">
                                            <Column field="evenement.libelle" header="Evènement"></Column>
                                            <Column field="evenement.nbplace" header="Nombre de place"></Column>
                                            <Column field="montant" header="Montant(€)"></Column>
                                            <Column field="moyen_paiement" header="Moyen de paiement"></Column>
                                            <Column field="date_evenement" header="Date"
                                                    body={dateEventBodyTemplate}></Column>
                                            <Column field="createdAt" header="Date de reservation"
                                                    body={createDateBodyTemplate}></Column>
                                        </DataTable>
                                    </Card>

                                </div>
                            </div>
                            {/* / Content */}
                            {/* Footer */}
                            <Footer/>
                            {/* / Footer */}
                            <div className="content-backdrop fade"/>
                        </div>
                        {/* Content wrapper */}
                    </div>
                    {/* / Layout page */}
                </div>
                {/* Overlay */}
                <div className="layout-overlay layout-menu-toggle"/>
            </div>


        </>
    );
}


function formatDateWithMicroseconds(date) {
    // Formater la date en millisecondes
    const formatted = format(date, "yyyy-MM-dd HH:mm:ss.SSS");
    // Générer des microsecondes aléatoires (3 chiffres supplémentaires)
    const microseconds = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    return `${formatted}${microseconds}`;
}
