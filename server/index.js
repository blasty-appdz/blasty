const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(cors());
app.use(express.json());

// Envoyer OTP
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    await twilio.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Vérifier OTP
app.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const result = await twilio.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });
    if (result.status === 'approved') {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: 'Code incorrect' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, () => console.log('Serveur OTP Blasty sur port 3001'));