import Image from "next/image";
import styles from "./page.module.css";
import { Button } from 'primereact/button';
import Aside from "@/app/components/aside";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import {Card} from "primereact/card";

export default function Billeterie() {

  return (
      <>
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
                                        <h6>12</h6>
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
                                        <h6>15</h6>
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
                                        <h6>320 €</h6>
                                    </div>
                                </div>

                            </Card>
                        </div>


                        <div className="col-lg-6 mt-4">
                            <Card subTitle="Billets reservés par catégorie">
                                <table style={{width:'100%'}}>
                                    <tbody>
                                        <tr>
                                            <td> <span className="text-primary">Cat 01</span></td>
                                            <td> 12</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </div>

                        <div className="d">

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

      </>
  );
}
