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
};

module.exports = swaggerJSDoc(options);
