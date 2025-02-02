const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' }); // Correction ici
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'secretkey');
    req.user = decoded; // Attache l'utilisateur à la requête
    return proceed();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' }); // Correction ici
  }
};
