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
import {useParams} from "next/navigation";
import {categorieService} from "@/app/services/categorie.service"; // For confirmDialog method


export default function categorie() {
    const [categories=[], setCategories] = useState([]);
    const param = useParams();
    const event_id = param.slug;

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

    let category = {
        id:0,
        libelle: "",
        nbplace: 0,
        montant: 0,
        description: "",
        evenement:event_id
    }

    let evenemet ={
                    createdAt: 0,
                    updatedAt: 0,
                    id: 0,
                    libelle: "d",
                    nbplace: 0,
                    lieu: "",
                    date_evenement: "",
                    date_limite: "",
                    description: "",
                    statut: "",
                    user: 0
                };


    const toast = useRef(null);

    const [categorie, setValue] = useState(category);
    const [evenement, setEvenement] = useState(evenemet);

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    const [visible, setVisible] = useState(false);

    const user = UserHelper.getUser();
    const { handleSubmit, control, reset } = useForm();
    const [date, setDate] = useState(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...categorie, [e.target.name]: e.target.value });
    };


    const onSubmit = () => {
        //console.log("Form Data:", data);
        //setVisible(false);

        //e.preventDefault();
        setIsLoading(true);

        if(!isUpdating){
            console.log("save");
            console.log(categorie);

            categorieService.save(categorie).then(data=>{
                    console.log(data)
                    setIsLoading(false);

                    if(data!=null){
                        setCategories([...categories,data])
                        toast.current.show({ severity: 'success', summary: 'Message', detail: 'Catégorie enregistré avec succès',life: 5000 });
                        setVisible(false);
                    }else{
                        console.log("erreur");
                    }

                },
                ()=>{
                    console.log("error post request");
                });
        }else{
            console.log(categorie)

            categorieService.update(categorie,categorie.id).then(data=>{
                    console.log(data);
                    loadCategories();
                    toast.current.show({ severity: 'success', summary: 'Message', detail: 'Catégorie mise à jour avec succès',life: 5000 });
                    setVisible(false);
                    setIsLoading(false);
                },
                (err)=>{
                    console.log("erreur du PUT request");
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        //console.log("les uses effects")

        evenementService.getByid(event_id).then(even=>{
            setEvenement(even);
            loadCategories();
        });

        //console.log("slug route");
        //console.log(event_id);
        //console.log("slug id == "+router.query.slug)


    }, []);


    const loadCategories = async () => {

        categorieService.get(event_id).then(data=>{
                if(data){
                    //console.log("set data")
                    setCategories(data);
                    console.log(data);
                }
                //console.log(data)
            },
            (err)=>{
                console.log(err)
            });

    };

    const footerContent = (
        <div className="text-center">
            <Button label={!isLoading ? "Enregister" : "Chargement..."}  onClick={onSubmit}  disabled={isLoading}  loading={isLoading} />
            <Button label="Fermer" className="p-button-danger ms-2" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    const updateDateBodyTemplate = (rowData) => {
        const formattedDate = format(new Date(rowData.updatedAt), "dd/MM/yyyy HH:mm", { locale: fr });
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

    const editCategotie =async (dataEvent)=>{
        let categ = dataEvent;
        setValue(categ);
        /*
            event.date_evenement = new Date(event.date_evenement);
            event.date_limite = new Date(event.date_limite);

        */
        setValue(categ);
        setVisible(true);
        setIsUpdating(true);

        console.log(dataEvent);
    };

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirmDelete = (dataEvent) => {
        confirmDialog({
            message: 'Voulez vous supprimer cette catégorie?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger p-button-sm',
            rejectClassName: 'p-button-Primary p-button-sm me-2',

            acceptLabel:'Oui Supprimer',
            rejectLabel:'Non',
            accept:()=>{

                evenementService.delete(dataEvent.id).then(data=>{
                    setCategories(categories.filter(x=>x.id!=dataEvent.id));
                    toast.current.show({ severity: 'info', summary: 'Supprimer', detail: 'Catégorie supprimé avec succès', life: 3000 });

                },(err)=>{
                    toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression', life: 3000 });

                    console.log(err);
                })
            },
            reject:()=>{

            }
        });
    };


    const actionTemplate = (rowData) => {

        return (
            <>
                <Button icon="pi pi-pencil" onClick={() =>editCategotie(rowData)} rounded text />
                <Button icon="pi pi-trash" onClick={()=>confirmDelete(rowData)} rounded text severity="danger" />
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
                                    <Card>
                                        <div className="row">
                                            <span className="col-4">
                                                <b>Evènement :</b>{evenement.libelle}
                                            </span>
                                            <span className="col-4">
                                                <b>Nombre de place :</b>{evenement.nbplace}
                                            </span>

                                            <span className="col-4">
                                                <b>Date de modification :</b>{ format(new Date(evenement.updatedAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
                                            </span>

                                        </div>

                                    </Card>

                                </div>

                                <div className="row mt-2">
                                <div className="col-sm-5">
                                        <Button className="mb-2" label="Nouvelle catégorie" icon="pi pi-plus" iconPos="right" onClick={() => {setVisible(true);setValue(category);setIsUpdating(false)}} />
                                    </div>

                                </div>

                                <div className="row mt-4">
                                    <Card>
                                        <DataTable value={categories} scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}
                                                   columnResizeMode="expand" resizableColumns paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                   emptyMessage="Pas d'évèmenent sauvegardé." currentPageReportTemplate="Affiche {first} to {last} sur {totalRecords} entrées">
                                            <Column field="libelle" header="Libelle"></Column>
                                            <Column field="nbplace" header="Nombre de place"></Column>
                                            <Column field="createdAt" header="Date de création" body={createDateBodyTemplate}></Column>
                                            <Column field="updatedAt" header="Date de modification" body={updateDateBodyTemplate} ></Column>
                                            <Column  header="Actions" body={actionTemplate}></Column>
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



            <Dialog header={isUpdating?"Modifier une catégorie":"Ajouter une catégorie"} visible={visible} onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}
                    style={{width: '70vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}} footer={footerContent}>

                <form>
                    <div className="row">
                        <div className="col-6">

                            <div className="mb-3">
                                <label htmlFor="libelle">Libellé</label>
                                <InputText pt={style} id="libelle" name="libelle" value={categorie.libelle}
                                           onChange={handleChange} required/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="nbplace">Nombre de place</label>
                                <InputText pt={style} id="nbplace" name="nbplace" value={categorie.nbplace}
                                           onChange={handleChange} required/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="montant">Montant</label>
                                <InputText pt={style} id="montant" name="montant" value={categorie.montant}
                                           onChange={handleChange} required/>
                            </div>

                        </div>

                        <div className="mb-3 col-6">
                            <label htmlFor="description" className="form-label">Description</label>
                            <InputTextarea pt={style} value={categorie.description} id="description" name="description"
                                           onChange={handleChange} rows={5} cols={30} required/>
                        </div>

                    </div>

                </form>
            </Dialog>

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
