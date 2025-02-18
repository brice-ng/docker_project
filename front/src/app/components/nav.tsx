'use client';

import React from 'react';

import { usePathname } from 'next/navigation'

const nav = () => {
  return (
      <nav
          className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
          id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a
              className="nav-item nav-link px-0 me-xl-4"
              href="#"
          >
            <i className="bx bx-menu bx-sm"/>
          </a>
        </div>
        <div
            className="navbar-nav-right d-flex align-items-center"
            id="navbar-collapse"
        >
          {/* Search */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"/>
              <input
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Rechercher..."
                  aria-label="Rechercher..."
              />
            </div>
          </div>
          {/* /Search */}
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Place this tag where you want the button to render. */}
            <li className="nav-item lh-1 me-3"></li>
            {/* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                  className="nav-link dropdown-toggle hide-arrow"
                  href="#"
                  data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                      src="/assets/img/avatars/1.png"
                      alt=""
                      className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                              src="/assets/img/avatars/1.png"
                              alt=""
                              className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">Brice</span>
                        <small className="text-muted">Administrateur</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"/>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-user me-2"/>
                    <span className="align-middle">Profil</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-cog me-2"/>
                    <span className="align-middle">Paramètre</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="d-flex align-items-center align-middle">
                      <i className="flex-shrink-0 bx bx-credit-card me-2"/>
                      <span className="flex-grow-1 align-middle">Factures</span>
                      <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                        4
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"/>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-power-off me-2"/>
                    <span className="align-middle">Déconnexion</span>
                  </a>
                </li>
              </ul>
            </li>
            {/*/ User */}
          </ul>
        </div>
      </nav>
  )
}

export default nav
