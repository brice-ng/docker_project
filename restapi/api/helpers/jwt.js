const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'JWT Helper',

  description: 'Generate and verify JWT tokens.',

  inputs: {
    payload: {
      type: 'ref',
      required: true
    },
    action: {
      type: 'string',
      isIn: ['sign', 'verify'],
      required: true
    }
  },

  exits: {
    success: {
      description: 'Token processed successfully.'
    },
    invalidToken: {
      description: 'Invalid token provided.'
    }
  },

  fn: async function (inputs, exits) {
    const secretKey = 'votre_clé_secrète'; // Stockez dans un fichier d'environnement .env

    if (inputs.action === 'sign') {
      const token = jwt.sign(inputs.payload, secretKey, { expiresIn: '1h' });
      return exits.success(token);
    }

    if (inputs.action === 'verify') {
      try {
        const decoded = jwt.verify(inputs.payload, secretKey);
        return exits.success(decoded);
      } catch (error) {
        return exits.invalidToken(error.message);
      }
    }
  }
};
