/**
 * Achat.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    quantite:{
      type:'number',
      required:false,
    },

    montant:{
      type:'number',
      required:false,
    },

    moyen_paiement:{
      type:'string',
      required:true,

    },

     // Add a reference to billet
    evenement: {
      model: 'Evenement'
    }
    
  },

};

