const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

module.exports = {
  async sendEmailWithAttachment(to, subject, reservation,index, qrCodes, attachmentPath) {
    try {
      // Charger et rendre le template EJS
      const emailTemplatePath = path.join(__dirname, '../../views/emailTemplate.ejs');
      billet = reservation.billets[index];
      const htmlContent = await ejs.renderFile(emailTemplatePath, { reservation,billet, qrCodes });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: sails.config.custom.smtp.auth.user,
          pass: sails.config.custom.smtp.auth.pass
        }
      });

      const mailOptions = {
        from: sails.config.custom.smtp.auth.user,
        to,
        subject,
        html: htmlContent,
        attachments: [
          {
            filename: 'billet.pdf',
            path: attachmentPath
          }
        ]
      };

      const info = await transporter.sendMail(mailOptions);
      sails.log.info(`Email envoyé : ${info.messageId}`);

      // Supprimer le fichier après envoi
      fs.unlink(attachmentPath, (err) => {
        if (err) sails.log.error(`Erreur suppression fichier : ${err.message}`);
      });

      return info;
    } catch (error) {
      sails.log.error(`Erreur d'envoi d'email: ${error.message}`);
      throw error;
    }
  }
};
