import React from 'react'

const footer = () => {

    const date = new Date().getFullYear();
  return (
      <footer className="content-footer footer bg-footer-theme bg-white">
        <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
          <div className="mb-2 mb-md-0">
            ©{date} , Réalisé par
            <a href="#" target="_blank" className="footer-link fw-bolder">
              Billeterie en ligne
            </a>
          </div>
        </div>
      </footer>
  )
}

export default footer
