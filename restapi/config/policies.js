/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  //'*': 'isAuthenticated',
  //'/api/auth/signup': true


  '*': ['isAuthenticated'], // Protéger toutes les routes par défaut

  // Autoriser les routes d'authentification sans token
  //'AuthController': true, 

  // Autoriser toutes les routes qui commencent par /api/auth
  'AuthController': {
    'signup': true, 
    'login': true,
    'refreshToken':true
  }


};
