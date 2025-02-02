/**
 * EvenementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

        /**
     * @swagger
     * /api/evenement/save:
     *   post:
     *     summary: Créer un évènement
     *     description: Ajoute un nouvelle évènement.
     *     tags:
     *       - Evenements
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               libelle:
     *                 type: string
     *                 example: "event 1"
     *               lieu:
     *                 type: string
     *                 example: "un lieu"
     *               nbplace:
     *                 type: integer
     *                 example: 50
     *               date_limite:
     *                 type: datetime
     *                 example: '2025-02-02 19:47:09.261974'
     *               date_evenement:
     *                 type: datetime
     *                 example: '2025-02-02 19:47:09.261974'
     *               description:
     *                 type: string
     *                 example: '...'
     *               
     *     responses:
     *       201:
     *         description: évènement créée avec succès
     *       400:
     *         description: Requête invalide
     */
        create: async function (req, res) {
            try {
              const { libelle, nbplace, date_limite,date_evenement,description,lieu } = req.allParams();
              const evenement = await Evenement.create({ libelle, nbplace, date_limite, date_evenement, description, lieu }).fetch();
              return res.status(201).json(evenement);
            } catch (err) {
              return res.status(500).json(err);
            }
          },
        
          /**
           * @swagger
           * /api/evenement:
           *   get:
           *     summary: Récupérer toutes les évènements
           *     description: Renvoie une liste de toutes les évènements.
           *     tags:
           *       - Evenements
           *     responses:
           *       200:
           *         description: Liste des évènements
           */
          find: async function (req, res) {
            try {
              const Evenements = await Evenement.find();
              return res.json(Evenements);
            } catch (err) {
              return res.status(500).json(err);
            }
          },
          
          /**
           * @swagger
           * /api/evenement/{id}:
           *   get:
           *     summary: Récupérer un évènement spécifique
           *     description: Retourne les détails d'un évènement en fonction de son ID.
           *     tags:
           *       - Evenements
           *     parameters:
           *       - in: path
           *         name: id
           *         required: true
           *         schema:
           *           type: integer
           *     responses:
           *       200:
           *         description: évènement trouvée
           *       404:
           *         description: évènement non trouvée
           */
          findOne: async function (req, res) {
            try {
              const { id } = req.params;
              const evenement = await Evenement.findOne({ id });
              if (!evenement) return res.notFound({ error: "évènement non trouvé" });
              return res.json(evenement);
            } catch (err) {
              return res.status(500).json(err);
            }
          },
        
          /**
           * @swagger
           * /api/evenement/update/{id}:
           *   put:
           *     summary: Mettre à jour un évènement
           *     description: Met à jour les informations d'un évènement existante.
           *     tags:
           *       - Evenements
           *     parameters:
           *       - in: path
           *         name: id
           *         required: true
           *         schema:
           *           type: integer
           *     requestBody:
           *       required: true
           *       content:
           *         application/json:
           *           schema:
           *             type: object
           *             properties:
           *               libelle:
           *                 type: string
            *                 example: "event 1"
            *               nbplace:
            *                 type: integer
            *                 example: 50
            *               date_limite:
            *                 type: datetime
            *                 example: '2025-02-02 19:47:09.261974'
           *     responses:
           *       200:
           *         description: évènement mise à jour
           *       404:
           *         description: évènement non trouvée
           */
          update: async function (req, res) {
            try {
              const { id } = req.params;
              const updatedevenement = await Evenement.updateOne({ id }).set(req.allParams());
              if (!updatedevenement) return res.notFound({ error: "évènement non trouvé" });
              return res.json(updatedevenement);
            } catch (err) {
              return res.status(500).json(err);
            }
          },
        
          /**
           * @swagger
           * /api/evenement/{id}:
           *   delete:
           *     summary: Supprimer un évènement
           *     description: Supprime un évènement de la base de données.
           *     tags:
           *       - Evenements
           *     parameters:
           *       - in: path
           *         name: id
           *         required: true
           *         schema:
           *           type: integer
           *     responses:
           *       200:
           *         description: évènement supprimée
           *       404:
           *         description: évènement non trouvée
           */
          delete: async function (req, res) {
            try {
              const { id } = req.params;
              const deletedevenement = await Evenement.destroyOne({ id });
              if (!deletedevenement) return res.notFound({ error: "évènement non trouvé" });
              return res.json({ message: "évènement supprimé avec succès" });
            } catch (err) {
              return res.status(500).json(err);
            }
          }
          

};

