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

    'GET /api/': { controller: 'HomeController',action: 'index' },
    'POST /api/auth/signup': {controller:'AuthController', action:'signup'},

    'POST /api/auth/login': {controller:'AuthController', action:'login'},

    "GET /swagger": swaggerUi.setup(swaggerSpec),
};
