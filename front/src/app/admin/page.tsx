import Image from "next/image";
import styles from "./page.module.css";
import { Button } from 'primereact/button';
import Aside from "@/app/components/aside";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";

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
                  <div className="row"></div>
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
