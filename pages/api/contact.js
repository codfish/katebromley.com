const sendgrid = require('@sendgrid/mail');
const axios = require('axios');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).send('Not found');
  }

  // validate reCAPTCHA
  const recaptcha = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}`,
  );

  if (!recaptcha.data.success) {
    return res.status(403).send({
      message: 'Validation for this form failed.',
      error: recaptcha.data['error-codes'],
    });
  }

  const msg = {
    to: process.env.CONTACT_TO_EMAIL,
    from: {
      name: 'Website Contact',
      email: process.env.CONTACT_FROM_EMAIL,
    },
    subject: `Message from ${req.body.name} on katebromley.com`,
    text: `Name: ${req.body.name}\nEmail: ${req.body.email}\n\n${req.body.message}`,
  };

  try {
    await sendgrid.send(msg);
  } catch (error) {
    return res.status(400).send({
      message: 'We had trouble sending the message. Please try again.',
      error,
    });
  }

  return res.json({ message: 'Message sent successfully' });
};
