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

              const user = req.user;
              
              const { libelle, nbplace, date_limite,date_evenement,description,lieu } = req.allParams();
              const evenement = await Evenement.create({ libelle, nbplace, date_limite, date_evenement, description, lieu,user:user.id }).fetch();
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
              const user = req.user;
              const Evenements = await Evenement.find({user:user.id}).populate('Categories');
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
              const evenement = await Evenement.findOne({ id }).populate('Categories');
              if (!evenement) return res.notFound({ error: "évènement non trouvé" });
              return res.json(evenement);
            } catch (err) {
              return res.status(500).json(err);
            }
          },
        

         /**
           * @swagger
           * /api/evenement/info/{id}:
           *   get:
           *     summary: Récupérer un évènement spécifique avec le récapitulatif
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
            findOneInfo: async function (req, res) {
              //try {
                const { id } = req.params;
                const evenement = await Evenement.findOne({ id }).populate('Categories');

                const countReservation = await Achat.count({
                  evenement: evenement.id,
                });

                const countBillet = await Billet.getDatastore().sendNativeQuery(
                  'select count(*) total from billet b LEFT JOIN categorie cat ON b.categorie=cat.id LEFT JOIN evenement e ON e.id=cat.evenement WHERE e.id = $1', [evenement.id]
                );
                
                const countBilletByCategorie = await Categorie.getDatastore().sendNativeQuery(
                  'select cat.id as categorie_id,cat.libelle as categorie ,count(b.reference) as nombre_reserver from categorie cat LEFT JOIN billet b ON b.categorie=cat.id LEFT JOIN evenement e ON e.id=cat.evenement WHERE e.id = $1 group by cat.id', [evenement.id]
                );

                const total = countBillet.rows[0].total || 0; 

                evenement.total=total;
                evenement.total_categories=countBilletByCategorie.rows;

                if (!evenement) return res.notFound({ error: "évènement non trouvé" });
                return res.json(evenement);
              /*} catch (err) {
                return res.status(500).json(err);
              }*/
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
          },
                  

          /**
           * @swagger
           * /api/evenement/start/{id}:
           *   get:
           *     summary: Démarrer la vente des billet d'un évènement
           *     description: Mise en vente des billet d'un évènement existant.
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
           *         description: évènement démarré
           *       404:
           *         description: évènement non trouvée
           */

          start: async function (req, res) {
            try {
              const { id } = req.params;
              const updatedevenement = await Evenement.updateOne({ id }).set({statut:'lance'});
              if (!updatedevenement){
                return res.notFound({ error: "évènement non trouvé" });
              }else{
                return res.json(updatedevenement);
              } 
              
            } catch (err) {
              return res.status(500).json(err);
            }
          },
          
         /**
           * @swagger
           * /api/evenement/end/{id}:
           *   get:
           *     summary: Clôturer la vente des billet d'un évènement
           *     description: Mise en arrêt de la vente des billet d'un évènement manuellement.
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
           *         description: évènement clôturé
           *       404:
           *         description: évènement non trouvée
           */
          cloturer: async function (req, res) {
          try {
            const { id } = req.params;
            const updatedevenement = await Evenement.updateOne({ id }).set({statut:'cloture'});
            if (!updatedevenement){
              return res.notFound({ error: "évènement non trouvé" });
            }else{
              return res.json(updatedevenement);
            } 
            
          } catch (err) {
            return res.status(500).json(err);
          }
        },


};

