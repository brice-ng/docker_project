/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require("bcryptjs");

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
      minLength: 3,
      isEmail: true
    },
    adresse:{
      type:'string',
      required:false,
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
    api_key:{
      type:'string',
      required:false,
    },
    statut: {
      type: 'string',
      isIn: ['creation', 'actif', 'inactif'],
      defaultsTo: 'creation'
    },

  },
  
 // Hachage du mot de passe avant l'enregistrement
 beforeCreate: async function (user, proceed) {
  user.password = await bcrypt.hash(user.password, 10);
  return proceed();
},
  

customToJSON: function () {
  return _.omit(this, ["password"]);
},

};

