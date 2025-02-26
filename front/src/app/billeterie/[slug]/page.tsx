"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Button } from 'primereact/button';
import Aside from "@/app/components/aside";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import {Card} from "primereact/card";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { Sidebar } from 'primereact/sidebar';
import {Steps} from "primereact/steps";
import {InputNumber, InputNumberValueChangeEvent} from "primereact/inputnumber";

export default function Home() {

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
    const [visible, setVisible] = useState(true);

    let [activeIndex, setActiveIndex] = useState(0);
    const [value2, setValue2] = useState(0);


    const items = [
        {
            label: 'Panier'
        },
        {
            label: 'Vos coordonnées'
        },
        {
            label: 'Récapitulatif'
        },
        {
            label: 'Confirmation'
        }
    ];



    return (
        <>


            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">

                    {/* Layout container */}
                    <div className="layout-page">
                        {/* Content wrapper */}
                        <div className="content-wrapper">
                            {/* Content */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row mt-4">
                                    <div className="col-4">
                                        <Card>
                                            <h5>Event 1</h5>
                                            <i>Par Brice Ngongang</i> <br/>
                                            <i className="pi pi-calendar"></i> date
                                            <br/>

                                            <b><i className="pi pi-map-marker text-primary"></i> </b><span>Adresse</span>
                                        </Card>
                                    </div>

                                    <div className="col-8">
                                        <Card>
                                            <h3 className="text-center">Image</h3>
                                        </Card>
                                    </div>

                                </div>

                                <h4 className="mt-2 mb-4">A propos</h4>
                                <div className="row">
                                    <div className="col-8">

                                        <Card>
                                            <p>Description de l'évènement</p>
                                        </Card>
                                    </div>

                                    <div className="col-4">
                                        <Card className="text-center">
                                            <h3>Event 1</h3>
                                            <Button className="mb-2" label="Réserver" icon="pi pi-plus" iconPos="right"/>

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
                        <Card className="mt-3">
                            <div className="row">
                                <div className="col-8">
                                    <h6>VIP</h6>
                                    <p> très utilisé pour plusieurs types de chose </p>
                                </div>

                                <div className="col-4">
                                    <InputNumber className="input-number-side mb-2" value={value2}
                                                 onValueChange={(e: InputNumberValueChangeEvent) => setValue2(e.value)}
                                                 showButtons buttonLayout="horizontal" step={1}
                                                 min={0} max={100} decrementButtonClassName="p-button-secondary"
                                                 incrementButtonClassName="p-button-secondary"
                                                 incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                                    />
                                </div>
                            </div>
                        </Card>


                    </div>
                    :<></>}

                    {activeIndex == 1 ?
                        <div className="row">



                        </div>
                        :<></>}


                </div>


                <div className="side_footer">

                    <div className="footer_btn">
                        {activeIndex > 0 ? <Button className="mb-2" label="précedent" severity="secondary"
                                                   onClick={() => setActiveIndex(--activeIndex)}/> : <></>}

                        {activeIndex < 3 ? <Button className="mb-2 float-end" label="Suivant"
                                                   onClick={() => setActiveIndex(++activeIndex)}/> : <></>}

                        {activeIndex == 3 ? <Button className="mb-2 float-end" label="Valider"/> : <></>}

                    </div>


                </div>

            </Sidebar>

        </>
    );
}
