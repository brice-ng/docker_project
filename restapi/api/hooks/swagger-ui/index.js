const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../../../config/swagger");

module.exports = function defineSwaggerUiHook(sails) {
  return {
    initialize: function (cb) {
      sails.after("router:before", () => {
        sails.hooks.http.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
      });
      return cb();
    },
  };
};
