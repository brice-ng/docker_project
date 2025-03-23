/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …



  smtp: {
    host: 'smtp.gmail.com', // Remplace par ton serveur SMTP
    port: 587, // 465 si SSL, 587 pour TLS
    secure: false, // true pour SSL
    auth: {
      user: 'ins.yaoundetest@gmail.com',
      pass: 'krwxtnqwumgcudzn'
    }
  }



};
