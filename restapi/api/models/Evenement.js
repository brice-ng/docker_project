/**
 * Evenement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    libelle:{
      type:'string',
      required:true,
      minLength: 3
    },
    nbplace:{
      type:'number',
      required:true,
  
    },
    date_event:{
      type: 'string', columnType: 'datetime',
      required:true,
    },

    date_limite:{
       type: 'string', columnType: 'datetime',
      required:true,
    },

  },

};

