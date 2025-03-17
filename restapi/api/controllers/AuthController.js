const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {

  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Inscription d'un utilisateur
   *     description: Crée un nouvel utilisateur avec email et mot de passe.
   *     tags: 
   *       - Authentification
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nom
   *               - prenom
   *               - email
   *               - password
   *             properties:
   *               nom:
   *                 type: string
   *                 example: "nom"
   *               prenom:
   *                 type: string
   *                 example: "prenom"
   *               email:
   *                 type: string
   *                 example: "user@example.com"
   *               password:
   *                 type: string
   *                 example: "password123"
   *               adresse:
   *                 type: string
   *                 example: null
   *               entreprise:
   *                 type: string
   *                 example: null 
   *               secteur_activite:
   *                 type: string
   *                 example: null
   *     responses:
   *       201:
   *         description: Utilisateur créé avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Utilisateur créé avec succès."
   *                 user:
   *                   type: object
   *       400:
   *         description: Requête invalide
   *       500:
   *         description: Erreur interne du serveur
   */
  
  signup: async function (req, res) {
    try {
      const userData = req.body;

      if (!userData.email || !userData.password) return res.badRequest({ message: "Email et mot de passe requis." });

      const newUser = await User.create(userData).fetch();
      return res.status(201).json({ message: "Utilisateur créé avec succès.", user: newUser });
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Connexion d'un utilisateur
   *     description: Authentifie un utilisateur et renvoie un token JWT.
   *     tags: 
   *       - Authentification
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: "user@example.com"
   *               password:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       200:
   *         description: Connexion réussie
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Connexion réussie."
   *                 token:
   *                   type: string
   *                   example: "eyJhbGciOiJIUzI1..."
   *                 refreshToken:
   *                   type: string
   *                   example: "eyJhbGciOiJIUzI..."
   *       400:
   *         description: Email et mot de passe requis
   *       401:
   *         description: Mot de passe incorrect
   *       404:
   *         description: Utilisateur non trouvé
   *       500:
   *         description: Erreur interne du serveur
   */
  
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
      }

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return res.status(401).json({ message: "Mot de passe incorrect" });

      // Génération des tokens
      const accessToken = jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "7h" });
      const refreshToken = jwt.sign({ id: user.id, email: user.email }, "refresh_secret", { expiresIn: "7d" });

      return res.json({ message: "Connexion réussie.", token: accessToken, refreshToken ,user:user});
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //refresh token

  /**
   * @swagger
   * /api/auth/refresh-token:
   *   post:
   *     summary: Rafraîchir le token JWT
   *     description: Génère un nouveau token d'accès à partir du refresh token.
   *     tags: 
   *       - Authentification
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *                 example: "eyJhbGciOiJIUzI..."
   *     responses:
   *       200:
   *         description: Nouveau token généré
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   example: "eyJhbGciOiJIUzI..."
   *                 refreshToken:
   *                   type: string
   *                   example: "eyJhbGciOiJIUzI..."
   *       400:
   *         description: Refresh token manquant
   *       401:
   *         description: Refresh token invalide ou expiré
   */

  refreshToken: async function (req, res) {

    try {
      const { refreshToken } = req.body;
      if (!refreshToken){
        return res.status(401).json({ message: 'Refresh token requis.' });
      } 

      jwt.verify(refreshToken, "refresh_secret", (err, decoded) => {
        if (err){
          return res.status(401).json({ message: 'Refresh token invalide ou expiré.' });
        } 

        // Génération d'un nouveau token
        const accessToken = jwt.sign({ id: decoded.id, email: decoded.email }, "secretkey", { expiresIn: "15m" });
        const newRefreshToken = jwt.sign({ id: decoded.id, email: decoded.email }, "refresh_secret", { expiresIn: "7d" });

        return res.json({ token:accessToken, refreshToken: newRefreshToken });
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }


};
