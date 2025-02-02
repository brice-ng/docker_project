/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  

     /**
   * @swagger
   * /api/:
   *   get:
   *     summary: Home request
   *     description: Exemplet de requêt http
   *     tags: 
   *       - Home
   *     security:
   *       - BearerAuth: []
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
   *                 
   *       400:
   *         description: Email et mot de passe requis
   *       401:
   *         description: Mot de passe incorrect
   *       404:
   *         description: Utilisateur non trouvé
   *       500:
   *         description: Erreur interne du serveur
   */
  
    index: function (req, res) {

        let ibj={
            message:"Hello !",
            name:"brices ..",
            prenom:"vanneck",
            autre: "yes"
        };



        return res.json(ibj);
       },


};

