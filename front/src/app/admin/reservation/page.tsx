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
import {useRouter} from "next/navigation";
import {Dropdown} from "primereact/dropdown";
import {reservationService} from "@/app/services/reservation.service"; // For confirmDialog method


export default function reservation() {
    const [evenements=[], setEvenements] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [reservations=[], setReservation] = useState([]);

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


    let event = {
        id:0,
        libelle: "",
        lieu: "",
        nbplace: 0,
        date_limite: "",
        date_evenement: "",
        description: ""
    }
    const toast = useRef(null);


    const [visible, setVisible] = useState(false);
    const [addCategorieVisible, setAddCategorieVisible] = useState(false);



    const user = UserHelper.getUser();


    useEffect(() => {
        //console.log("les uses effects")
        loadEvenements();
    }, []);

    const loadEvenements = async () => {
        evenementService.get().then(data=>{
                if(data){
                    //console.log("set data")
                    setEvenements(data);

                    console.log(data);
                }
                //console.log(data)
            },
            (err)=>{
                console.log(err)
            });
    };

    const loadRervation = async (myEvent:any) => {
        console.log("load reservation");
        console.log(myEvent)

        reservationService.getReservationByEvenementId(myEvent.id).then(dataR=>{

            if(dataR){
                setReservation(dataR);
            }
            console.log(dataR)
        })


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
                                    <div className="col-sm-5">
                                        <Dropdown value={selectedEvent} onChange={(e) => {setSelectedEvent(e.value);loadRervation(e.value)}} options={evenements} optionLabel="libelle" placeholder="Selectionner un évènement"
                                                  filter   className="w-full md:w-14rem" />
                                    </div>

                                </div>

                                <div className="row mt-4">
                                    <Card>
                                        <DataTable value={reservations} scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}
                                                   columnResizeMode="expand" resizableColumns paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                   emptyMessage="Pas de reservation sauvegardé." currentPageReportTemplate="Affiche {first} to {last} sur {totalRecords} entrées">
                                            <Column field="evenement.libelle" header="Evènement"></Column>
                                            <Column field="evenement.nbplace" header="Nombre de place"></Column>
                                            <Column field="montant" header="Montant(€)"></Column>
                                            <Column field="moyen_paiement" header="Moyen de paiement"></Column>
                                            <Column field="date_evenement" header="Date" body={dateEventBodyTemplate} ></Column>
                                            <Column field="createdAt" header="Date de reservation" body={createDateBodyTemplate}></Column>
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
