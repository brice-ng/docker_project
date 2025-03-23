"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Button } from 'primereact/button';
import Aside from "@/app/components/aside";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import {Card} from "primereact/card";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import { Sidebar } from 'primereact/sidebar';
import {Steps} from "primereact/steps";
import {InputNumber, InputNumberValueChangeEvent} from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { RadioButton } from "primereact/radiobutton";
import Link from "next/link";
import {evenementService} from "@/app/services/evenement.service";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {reservationService} from "@/app/services/reservation.service";
import { io } from "socket.io-client";
import {Toast} from "primereact/toast";

export default function Home() {
    //const socket = io("http://localhost:1337");
    /*
    const socket = io("http://localhost:1337", {
        transports: ["websocket", "polling"],
    });*/


    const socket = io("http://localhost:1337", {
        transports: ['websocket'],
        extraHeaders: {
            Origin: 'http://localhost:4100', // Assure-toi que l'origine correspond à celle que tu as définie
        },
    });

    const ref = useRef(null);
    const param = useParams();
    const event_id = param.slug;

    //let dataInfos=[];

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
    const [visible, setVisible] = useState(false);
/**
    {
        "createdAt": 1742737244577,
        "updatedAt": 1742737244577,
        "id": 28,
        "reference": "032025emMABxb96HPQXPVEI5JJvfGqcAXcYxFus84iHWljTZp1UCnfJBRdTAdcTt-3-0",
        "nom": "brice",
        "prenom": "87Mat",
        "email": "brice@gmail.com",
        "statut": "Reserve",
        "categorie": 5,
        "achat": 37
    } */

    const [evenement, setEvenement] = useState({date_evenement:"2025-03-11T09:18:00.000Z",Categories:[],total:0});
    const [nombrePlace, setNbplace] = useState(0);
    const [categories=[], setCategories] = useState([]);

    const [billets=[], setBillets] = useState([]);

    const [categorie, setCategorie] = useState({});

    let [activeIndex, setActiveIndex] = useState(0);
    const [value2, setValue2] = useState(0);

    const [formValues, setFormValues] = useState({});

    const [dataInfos=[], setDataInfos] = useState([
        {
            nom:'',
            prenom:'',
            email:'',
            categorie:0
        }
    ]);

    const items = [
        {
            label: 'Panier',
        },
        {
            label: 'Vos coordonnées'
        },
        {
            label: 'Récapitulatif de votre panier'
        },
        {
            label: 'Confirmation'
        }
    ];

    let user = {
        nom:"",
        prenom: "",
        email: ""
    }
    const [userTicket, setUserValue] = useState(user);
    const [paiement, setPaiement] = useState('');

    /*
        const userTickethandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

            setUserValue({ ...userTicket, [e.target.name]: e.target.value });
        };
    */

    const toast = useRef(null);

    const userTickethandleChange = (e, index) => {
        const { name, value } = e.target;
        setDataInfos((info) =>
            info.map((ticket, i) => i === index ? { ...ticket, [name]: value } : ticket)
        );
    };

    const setNombreTicker = (e: number) => {
        setValue2( e );
        console.log("valeur set =>"+e);
        //dataInfos=[];
        setDataInfos([]);
        let myInfos=[];
        console.log(categorie)
        for(let i=0;i<e;i++){
            console.log('item forEach')
            myInfos.push({
                nom:'',
                prenom:'',
                email:'',
                categorie:categorie.id
            })
        }

        setDataInfos(myInfos);
        console.log(dataInfos);
    };

    const handleInputChange = (id, field, value) => {
        setFormValues((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));
    };

    const ValiderPaiement = async () => {
        console.log("validation du paiement");


        let dataPaiment={
            evenement: evenement.id,
            moyen_paiement: "Gratuit",
            montant: dataInfos.length*categorie.montant,
            billets: dataInfos
        };

        console.log(dataPaiment);
        reservationService.reserver(dataPaiment).then(data=>{
            console.log(data);
            if(data){
                setBillets(data)
                setActiveIndex(++activeIndex);
            }

        });

    };


    const dateEventBodyTemplate =  (rowData) => {
        const formattedDate =  format(new Date(rowData.date_evenement), "dd/MM/yyyy HH:mm", {locale: fr});
        //console.log(formattedDate);
        return `<span>${formattedDate}</span>`;
    };

    const openReserver =  (rowData) => {
        //console.log('open')
        setCategorie(rowData);
        setVisible(true)
        setActiveIndex(0);
        setDataInfos([]);
        //console.log(rowData)
    };



    const printTicket =  () => {

        let row = billets[0];
        console.log("print start")
        reservationService.printReservationBillet(row.achat).then(data=>{
            //console.log(data);
        });

    };




    useEffect(() => {
        //console.log("les uses effects")

        evenementService.getInfoClientById(event_id).then(data=>{
                if(data){
                    //console.log("set data")
                    console.log(data);
                    setEvenement(data);
                    //setCategories(data.Categories);
                    console.log(data.Categories);
                    console.log(categories);
                    setNbplace(data.nbplace);
                    let nbrPlace=data.nbplace;
                    console.log("ticketBought_"+event_id);
                    socket.on("ticketBought_"+event_id, (dataResult) => {
                        console.log(dataResult)

                        console.log("ticketBought event")
                        //console.log(data)
                        //setNbplace(nombrePlace-data.billets.length)
                        console.log("length =>"+dataResult.billets.length)
                        for(let i=0;i<dataResult.billets.length;i++){
                            let nb = nbrPlace-1;
                            setNbplace(nb);
                        }

                        toast.current.show({ severity: 'info', summary: 'Message', detail: 'Réservation effectué ',life: 5000 });

                    });

                    return () => {
                        socket.off("ticketBought_"+event_id);
                    };

                }
                //console.log(data)
            },
            (err)=>{
                console.log(err)
                console.log("non trouvé")
            });

        //console.log("slug route");
        //console.log(event_id);
        //console.log("slug id == "+router.query.slug)


    }, []);



    return (
        <>

            <Toast ref={toast}/>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">

                    {/* Layout container */}
                    <div className="layout-page">
                        {/* Content wrapper */}
                        <div className="content-wrapper">
                            {/* Content */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row mt-4">

                                    <div className="col-lg-8 col-md-12">
                                        <Card>
                                        <Image src="/assets/image001.jpg"  width={500}  height={600} alt="banner image" />
                                        </Card>
                                    </div>

                                    <div className="col-lg-4 col-md-12">
                                        <Card className="ps-3 pe-4">
                                            <h5>{evenement.libelle}</h5>
                                            <i>Par Brice Ngongang</i> <br/>
                                            <i className="pi pi-calendar"></i> {format(new Date(evenement.date_evenement), "dd/MM/yyyy HH:mm", {locale: fr})}
                                            <br/>

                                            <b><i className="pi pi-map-marker text-primary"></i> </b><span>{evenement.lieu}</span>
                                        </Card>

                                        <Card className="text-center mt-4">
                                            <h3>{evenement.libelle}</h3>
                                            <div>
                                                <h6>Nombre de place restante : <span
                                                    className="text-success">{nombrePlace-evenement.total}</span></h6>
                                            </div>

                                            <table className="reserver-table">
                                                <tbody>
                                                {evenement.Categories.map((item)=> (
                                                    <tr key={item.id}>
                                                        <td><i>{item.libelle} ({item.montant}€)</i></td>
                                                        <td>
                                                            <Button className="mb-2 ms-4" label="Réserver" size="small"
                                                                    icon="pi pi-plus" onClick={() => {
                                                                openReserver(item)
                                                            }} iconPos="right"/>

                                                        </td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </Card>

                                    </div>


                                </div>

                                <h4 className="mt-2 mb-4">A propos</h4>
                                <div className="row">
                                    <div className="col-lg-8">
                                        <Card>
                                            <p> {evenement.description}</p>
                                        </Card>
                                    </div>

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


            <Sidebar visible={visible} onHide={() => setVisible(false)} position="right" className="side_width" >
                <div className="card">
                    <Steps readOnly model={items} activeIndex={activeIndex}  />
                </div>


                <div className="side_content">
                    {activeIndex == 0 ?
                    <div className="row">

                        <Card className="mt-3" >
                            <div className="row">
                                <div className="col-8">
                                    <h6>{categorie.libelle}</h6>
                                    <p> {categorie.description} </p>
                                </div>

                                <div className="col-4">
                                    <InputNumber className="input-number-side mb-2" value={value2}
                                                 onValueChange={(e: InputNumberValueChangeEvent) => setNombreTicker(e.value)}
                                                 showButtons buttonLayout="horizontal" step={1}
                                                 min={0} max={categorie.nbplace-evenement.total} decrementButtonClassName="p-button-secondary"
                                                 incrementButtonClassName="p-button-secondary"
                                                 incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                                    />
                                </div>
                            </div>
                        </Card>


                    </div>
                    :<></>}

                    {activeIndex == 1 &&
                        dataInfos.map((info, index) => (

                            <Panel key={index} className="mt-2" ref={ref} header={`Ticket n° ${index + 1}   Classe : ${categorie.libelle}`} toggleable>
                                <div className="row">

                                    <div className="mb-3 col-6">
                                        <label htmlFor={`nom-${index}`}>Nom</label>
                                        <InputText pt={style} id={`nom-${index}`} name="nom" value={info.nom} onChange={(e) => userTickethandleChange(e, index)} required/>
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label htmlFor={`prenom-${index}`}>Prénom</label>
                                        <InputText pt={style} id={`prenom-${index}`} name="prenom" value={info.prenom} onChange={(e) => userTickethandleChange(e, index)} required/>
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label htmlFor={`email-${index}`}>Email</label>
                                        <InputText pt={style} id={`email-${index}`} name="email" value={info.email} onChange={(e) => userTickethandleChange(e, index)} required/>
                                    </div>

                                </div>
                            </Panel>


                        ))
                    }




                    {activeIndex == 2 ?

                        <div>
                            <Panel className="mt-4" ref={ref} header="Contenu de votre panier" >
                                <div className="row">

                                    <div className="mb-3 col-6">
                                        <span className="me-1">Event</span> (x<span className="ms-2">{dataInfos.length})</span>
                                    </div>

                                    <div className="mb-3 col-6">
                                        <span className="font-weight-bold">{dataInfos.length*categorie.montant} €</span>
                                    </div>


                                </div>
                            </Panel>

                            <Panel className="mt-4" ref={ref} header="Mode de règlement" >
                                        <RadioButton inputId="paiement1" name="pizza" value="gratuit" onChange={(e) => setPaiement(e.value)} checked={paiement === 'gratuit'} />
                                        <label htmlFor="paiement1" className="ml-2">Gratuit</label>
                            </Panel>

                        </div>


                        :<></>}


                        {activeIndex == 3 ?

                        <div className="mt-4">
                            <h4><i className="pi pi-check text-primary me-2 ms-2"></i>Votre commande a bien été validé</h4>
                            <h5 className="mt-2">La commande a été enregistrée</h5>

                            <Link href="#" onClick={()=>{printTicket()}}>Télécharger vos billets</Link>


                            <Card className="mt-4" title="Message de l'organisateur à votre attention">
                                <p>Merci d'imprimer votre billet ou de le présenter sur votre smartphone à l'entrée de l'évènement.
                                    Une pièce d'identité pourra vous être demandée.
                                </p>

                            </Card>
                        </div>


                        :<></>}


                </div>


                <div className="side_footer">

                    <div className="footer_btn">
                        {activeIndex > 0 && activeIndex <3 ? <Button className="mb-2" label="précedent" severity="secondary"
                                                   onClick={() => setActiveIndex(--activeIndex)}/> : <></>}

                        {activeIndex < 2 ? <Button className="mb-2 float-end" label="Suivant"
                                                   onClick={() => setActiveIndex(++activeIndex)}/> : <></>}

                        {activeIndex == 2 ? <Button className="mb-2 float-end" label="Valider"
                                                                        onClick={() => ValiderPaiement()}/> : <></>}

                        {activeIndex == 3 ? <Button className="mb-2 float-end" label="Terminer" onClick={() => setVisible(false)}/> : <></>}

                    </div>


                </div>

            </Sidebar>

        </>
    );
}
