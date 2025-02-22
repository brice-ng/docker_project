'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from 'primereact/button';
import Aside from "@/app/components/aside";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import { DataTable } from 'primereact/datatable';
import {useState} from "react";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {Dialog} from "primereact/dialog";
import Form from "next/form";
import { useForm, Controller } from "react-hook-form";

export default function Categorie() {
    const [products=[], setProducts] = useState([]);
    const [visible, setVisible] = useState(false);

    const { handleSubmit, control, reset } = useForm();

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
        setVisible(false);
        reset(); // Réinitialiser le formulaire après soumission
    };

    const footerContent = (
        <div className="text-center">
            <Button label="Enregister"  onClick={() => { console.log("on save")}} />
            <Button label="Fermer" className="p-button-danger ms-2" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

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
                          <div className="col-sm-5">
                              <Button className="mb-2" label="Nouvelle catégorie" icon="pi pi-plus" iconPos="right" onClick={() => setVisible(true)} />
                          </div>

                      </div>

                      <div className="row mt-4">
                          <Card>
                              <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
                                  <Column field="libelle" header="Libelle"></Column>
                                  <Column field="nbplace" header="Nombre de place"></Column>
                                  <Column field="montant" header="Prix"></Column>
                                  <Column  header="Actions"></Column>
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

          <Dialog header="Ajouter une catégorie" visible={visible} onHide={() => {
              if (!visible) return;
              setVisible(false);
          }}
                  style={{width: '50vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}} footer={footerContent}>


              <p>

              </p>

              <form>
                  <div className="mb-3">
                      <label htmlFor="libelle" className="form-label">Libellé</label>
                      <input type="text" className="form-control" id="libelle" name="libelle"
                             placeholder="Entrez le libellé"/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="prix" className="form-label">Libellé</label>
                      <input type="text" className="form-control" id="prix" name="prix"
                             placeholder="Entrez le prix"/>
                  </div>

                  <div className="mb-3">
                      <label htmlFor="description" className="form-label">Libellé</label>
                      <textarea className="form-control" id="description" name="description"></textarea>
                  </div>

              </form>
          </Dialog>

      </>
  );
}
