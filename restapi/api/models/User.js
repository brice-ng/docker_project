/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

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
      unique: true,
      minLength: 3
    },
    adresse:{
      type:'string',
      required:true,
      minLength: 3
    },
    entreprise:{
      type:'string',
      required:false,
      allowNull: true
    },
    secteur_activite:{
      type:'string',
      required:false,
      allowNull: true
    },
    password:{
      type:'string',
      required:true,
      minLength: 3
    },

  },

};

