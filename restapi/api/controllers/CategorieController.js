/**
 * CategorieController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    /**
     * @swagger
     * /api/categorie/save:
     *   post:
     *     summary: Créer une catégorie de billet
     *     description: Ajoute une nouvelle catégorie à la base de données.
     *     tags:
     *       - Categories de billet
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               libelle:
     *                 type: string
     *                 example: "VIP"
     *               nbplace:
     *                 type: integer
     *                 example: 50
     *               montant:
     *                 type: number
     *                 example: 100.0
     *               devise:
     *                 type: string
     *                 example: "euro"
     *               evenement:
     *                 type: number
     *                 example: 1
     *     responses:
     *       201:
     *         description: Catégorie créée avec succès
     *       400:
     *         description: Requête invalide
     */
    create: async function (req, res) {
      try {
        const { libelle, nbplace, montant, devise,evenement,description } = req.allParams();
        const categorie = await Categorie.create({ libelle, nbplace, montant, devise,evenement }).fetch();
        return res.status(201).json(categorie);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    /**
     * @swagger
     * /api/categorie/all/{id}:
     *   get:
     *     summary: Récupérer toutes les catégories de billet par évènement (ID)
     *     description: Renvoie une liste de toutes les catégories.
     *     tags:
     *       - Categories de billet
     *     responses:
     *       200:
     *         description: Liste des catégories
     */
    findbyEvenement: async function (req, res) {
      try {
        const { id } = req.params;
        const categories = await Categorie.find({evenement:id});
        return res.json(categories);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
    
    /**
     * @swagger
     * /api/categorie/{id}:
     *   get:
     *     summary: Récupérer une catégorie spécifique
     *     description: Retourne les détails d'une catégorie en fonction de son ID.
     *     tags:
     *       - Categories de billet
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Catégorie trouvée
     *       404:
     *         description: Catégorie non trouvée
     */
    findOne: async function (req, res) {
      try {
        const { id } = req.params;
        const categorie = await Categorie.find({ id });
        if (!categorie) return res.notFound({ error: "Catégorie non trouvée" });
        return res.json(categorie);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    /**
     * @swagger
     * /api/categorie/update/{id}:
     *   put:
     *     summary: Mettre à jour une catégorie
     *     description: Met à jour les informations d'une catégorie existante.
     *     tags:
     *       - Categories de billet
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
     *                 example: "VIP"
     *               nbplace:
     *                 type: integer
     *                 example: 60
     *               montant:
     *                 type: number
     *                 example: 120.0
     *               devise:
     *                 type: string
     *                 example: "euro"
     *     responses:
     *       200:
     *         description: Catégorie mise à jour
     *       404:
     *         description: Catégorie non trouvée
     */
    update: async function (req, res) {
      try {
        const { id } = req.params;
        const updatedCategorie = await Categorie.updateOne({ id }).set(req.allParams());
        if (!updatedCategorie) return res.notFound({ error: "Catégorie non trouvée" });
        return res.json(updatedCategorie);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    /**
     * @swagger
     * /api/categorie/{id}:
     *   delete:
     *     summary: Supprimer une catégorie
     *     description: Supprime une catégorie de la base de données.
     *     tags:
     *       - Categories de billet
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Catégorie supprimée
     *       404:
     *         description: Catégorie non trouvée
     */
    delete: async function (req, res) {
      try {
        const { id } = req.params;
        const deletedCategorie = await Categorie.destroyOne({ id });
        if (!deletedCategorie) return res.notFound({ error: "Catégorie non trouvée" });
        return res.json({ message: "Catégorie supprimée avec succès" });
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    
  };
  
