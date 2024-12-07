require('dotenv').config();

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;

app.use(express.static('.'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ylainbiay.casinointer@gmail.com',
            pass: 'akcyeubfxcaucqta'
        }
    });

    const mailOptions = {
        from: 'ylainbiay.casinointer@gmail.com',
        to: req.body.email,
        subject: `Message From ${req.body.email} Capella.world`,
        html: `
            <h3>Formulaire de contact</h3>
            <p><strong>Nom:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            <p><strong>Téléphone:</strong> ${req.body.phone}</p>
            <p><strong>Message:</strong> ${req.body.message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé');
        return res.json({ message: 'success' });
    } catch (error) {
        console.log('Erreur lors de l\'envoi de l\'email:', error);
        return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
