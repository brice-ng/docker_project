/**
 * Billet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    reference:{
      type:'string',
      required:true,
      minLength: 3
    },
    nom:{
      type:'string',
      required:true,
      minLength: 3
    },
    prenom:{
      type:'string',
      required:true,
      minLength: 3
    },
    email:{
      type:'string',
      required:true,
      unique: false,
      minLength: 3,
      isEmail: true
    },

    statut: {
      type: 'string',
      isIn: ['Reserve', 'Vendu', 'Annule'],
      defaultsTo: 'Reserve'
    },
    
    // Add a reference to category of bie
    categorie: {
      model: 'Categorie'
    },

    // Add a reference to billet
    achat: {
      model: 'Achat'
    }


  },

};

