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

    'OPTIONS /*': { 
        cors: true 
    },
    // Route pour les connexions WebSocket
    "GET /socket.io/": { action: "sockets/connect", skipAssets: true, isSocket: true },
    
    // Autoriser les requêtes polling et WebSocket de socket.io
    "GET /socket.io/*": { action: "sockets/connect", skipAssets: true, isSocket: true },

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
    'GET /api/categorie/all/:id': {controller:'CategorieController', action:'findbyEvenement'},
    'GET /api/categorie/:id': {controller:'CategorieController', action:'findOne'},
    'PUT /api/categorie/update/:id': {controller:'CategorieController', action:'update'},
    'DELETE /api/categorie/:id': {controller:'CategorieController', action:'delete'},


    /**
     * Route Evènement
     */

    'POST /api/evenement/save': {controller:'EvenementController', action:'create'},
    'GET /api/evenement': {controller:'EvenementController', action:'find'},
    'GET /api/evenement/:id': {controller:'EvenementController', action:'findOne'},
    'GET /api/evenement/info/:id': {controller:'EvenementController', action:'findOneInfo'},
    'GET /api/evenement/info-client/:id': {controller:'EvenementController', action:'findOneInfoClient'},

    'PUT /api/evenement/update/:id': {controller:'EvenementController', action:'update'},
    'DELETE /api/evenement/:id': {controller:'EvenementController', action:'delete'},
    'GET /api/evenement/start/:id': {controller:'EvenementController', action:'start'},
    'GET /api/evenement/end/:id': {controller:'EvenementController', action:'cloturer'},

    

    /**
     * Route Reservation
     */

    'POST /api/billet/reserver': {controller:'BilletController', action:'reserver'},
    'GET /api/billet/liste/:evenement_id': {controller:'BilletController', action:'findbyEvenement'},

    'GET /api/billet/imprimer/:reservation_id': {controller:'BilletController', action:'printBillet'},

    
  
    /**
     * Gestion des organisateur de d'évènement
     */
    
   
    
    /**
     * visualisation du billet en pdf
     */

    'get /pdf': {
        view: 'pdfTemplate'
    },

};
