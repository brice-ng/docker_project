/**
 * BilletController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
   /**
     * @swagger
     * /api/billet/reserver:
     *   post:
     *     summary: Enregistre un paiement et ses billets associés
     *     description: Ajoute une nouvelle reservation à la base de données.
     *     tags:
     *       - Gestion des billets et reservations
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
    *             type: object
    *             required:
    *               - evenement
    *               - moyen_paiement
    *               - montant
    *               - billets
    *             properties:
    *               evenement:
    *                 type: string
    *                 example: "Concert_123"
    *               moyen_paiement:
    *                 type: string
    *                 example: "Carte Bancaire"
    *               montant:
    *                 type: number
    *                 example: 500
    *               billets:
    *                 type: array
    *                 items:
    *                   type: object
    *                   properties:
    *                     nom:
    *                       type: string
    *                       example: "votre nom"
    *                     prenom:
    *                       type: string
    *                       example: "Votre prenom"
    *                     email:
    *                       type: string
    *                       example: "tonemail@exemple.com"
    *                     categorie:
    *                       type: number
    *                       example: 152
     *     responses:
     *       201:
     *         description: Paiement et billets enregistrés avec succès
     *       400:
     *         description: Requête invalide
     */
        reserver: async function (req, res) {

            const date = new Date();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');  // +1 car les mois commencent à 0
                const year = date.getFullYear();

                // Générer une partie aléatoire de 4 caractères
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let randomPart = '';
                for (let i = 0; i < chars.length - 4; i++) {  // -4 car 4 caractères seront utilisés pour le mois et l'année
                    const randomIndex = Math.floor(Math.random() * chars.length);
                    randomPart += chars[randomIndex];
                }
                
                // Retourner la référence (mois+année + 4 caractères aléatoires)
                //return `${month}${year}${randomPart}`;

                const { evenement, moyen_paiement, montant,billets} = req.allParams();

                const reference = `${month}${year}${randomPart}-`+evenement;

                const reservation = await Achat.create({ evenement, moyen_paiement, montant}).fetch();


                // Vérifier que billets est un tableau
                if (!Array.isArray(billets) || billets.length === 0) {
                    return res.badRequest({ message: "La liste des billets est invalide ou vide." });
                }

                // Ajouter l'ID du paiement à chaque billet (s'ils sont liés)
                let billetsAvecPaiement = billets.map(billet => ({
                    ...billet,
                    reference:reference,
                    achat: reservation.id, // Associe le paiement aux billets
                }));

                billetsAvecPaiement.forEach((x,index)=>{
                    x.reference=x.reference+'-'+index
                });

                const billetsEnregistres = await Billet.createEach(billetsAvecPaiement).fetch();
                //const catId = billetsAvecPaiement.map(x=>x.categorie)[0];

                // Émettre un événement WebSocket
                sails.sockets.blast("ticketBought_"+evenement, { eventId: evenement ,billets:billetsAvecPaiement,montant:montant});

                return res.status(201).json(billetsEnregistres);

/** 
            try {
             
                
            } catch (err) {
                return res.status(500).json('erreur');
            }
*/

          },
    


   /**
     * @swagger
     * /api/billet/liste/{evenementId}:
     *   get:
     *     summary: Récupérer toutes les reservations de billet par évènement (ID)
     *     description: Renvoie une liste de toutes les reservation pour évènement.
     *     tags:
     *       - Gestion des billets et reservations
     *     parameters:
     *       - in: path
     *         name: evenementId
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Liste des reservation
     */
    findbyEvenement: async function (req, res) {
        try {
          const { evenement_id } = req.params;
          const reservations = await Achat.find({evenement:evenement_id}).populate('evenement');
          return res.json(reservations);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
 





};

