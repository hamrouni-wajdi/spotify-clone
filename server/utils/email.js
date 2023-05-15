const nodemailer = require('nodemailer');
const templates = require('./templates.js');

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.name = user.name;
    this.from = `Maqsud Tolipov - spotify.clone`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.NMAILER_USER,
        pass: process.env.NMAILER_PASS,
      },
    });
  }

  async send(subject, html) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('🎵 Welcome to Spotify 🎧', templates.welcomeTemplate());
  }

  async sendResetToken() {
    await this.send('Reset token', templates.resetTokenTemplate());
  }
};
