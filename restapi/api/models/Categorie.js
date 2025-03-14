/**
 * Categorie.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    libelle:{
      type:'string',
      required:true,
      minLength: 2
    },

    nbplace:{
      type:'number',
      required:true,
    },

    montant:{
      type:'number',
      required:true,
    },
    devise:{
      type:'string',
      defaultsTo:"euro"
    },
    description:{
      type:'string',
      defaultsTo:"",
      required:false,
    },

    // Add a reference to evenement
    evenement: {
      model: 'Evenement'
    }

  },

};

