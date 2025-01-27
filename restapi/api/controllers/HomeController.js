/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
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

