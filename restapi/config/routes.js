/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

module.exports.routes = {

    /**
     * Route correspondant à swagger pour la documentation de l'API
     */
    "GET /swagger": swaggerUi.setup(swaggerSpec),


    /**
     * Route Authentification
     */
    'GET /api/': { controller: 'HomeController',action: 'index' },
    'POST /api/auth/signup': {controller:'AuthController', action:'signup'},

    'POST /api/auth/login': {controller:'AuthController', action:'login'},
    'POST /api/auth/refresh-token': {controller:'AuthController', action:'refreshToken'},

    /**
     * Route Categorie de billet
     */

    'POST /api/categorie/save': {controller:'CategorieController', action:'create'},
    'GET /api/categorie': {controller:'CategorieController', action:'find'},
    'GET /api/categorie/:id': {controller:'CategorieController', action:'findOne'},
    'PUT /api/categorie/update/:id': {controller:'CategorieController', action:'update'},
    'DELETE /api/categorie/:id': {controller:'CategorieController', action:'delete'},


    /**
     * Route Evènement
     */

    'POST /api/evenement/save': {controller:'EvenementController', action:'create'},
    'GET /api/evenement': {controller:'EvenementController', action:'find'},
    'GET /api/evenement/:id': {controller:'EvenementController', action:'findOne'},
    'PUT /api/evenement/update/:id': {controller:'EvenementController', action:'update'},
    'DELETE /api/evenement/:id': {controller:'EvenementController', action:'delete'},

    



};
