const nodemailer = require('nodemailer');

// Create a nodemailer transporter using your SMTP credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525, // or your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'devanshdumir@gmail.com',
    pass: 'urpass',
  },
});

// Function to send a welcome email
const sendWelcomeEmail = async (toEmail) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'devanshdumir@gmail.com',
      to: toEmail,
      subject: 'Welcome to Savvyo!',
      text: 'Thank you for registering with Savvyo. We are excited to have you!',
      html: '<p>Thank you for registering with Savvyo. We are excited to have you!</p>',
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

module.exports = { sendWelcomeEmail };
