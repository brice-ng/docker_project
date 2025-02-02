const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Ticketing API",
      version: "1.0.0",
      description: "Documentation API avec Swagger",
    },
    servers: [{ url: "http://localhost:1337" }],
  },
  apis: ["./api/controllers/*.js"], // Spécifie où sont les fichiers à documenter

   // Paramètres globaux pour les réponses et erreurs
  responses: {
  '200': {
    description: 'Réponse réussie'
  },
  '201': {
    description: 'Création réussie'
  },
  '400': {
    description: 'Demande invalide'
  },
  '404': {
    description: 'Non trouvé'
  },
  '500': {
    description: 'Erreur serveur interne'
  }
  }

};

module.exports = swaggerJSDoc(options);
