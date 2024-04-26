
// // Install nodemailer 
// // import nodemialer
// const nodemailer = require('nodemailer');

// // Function to send an email
// async function sendMail({ from, to, subject, text }) {
//     // Create email transporter
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'devanshdumir@gmail.com',
//             pass: 'urpass'
//         }
//     });

//     // Config mail content
//     const mailOptions = {
//         from: from,
//         to: to,
//         subject: subject,
//         text: text
//     };

//     // Send email
//     try {
//         const result = await transporter.sendMail(mailOptions);
//         console.log('Email Sent successfully!');
//     } catch (error) {
//         console.log('Email send failed with error: ', error);
//     }
// }

// // Sending welcome email to seller with his credential
// const sellerWelcome = {
//     from: 'devanshdumir@gmail.com',
//     to: sellerEmail,
//     subject: 'Welcome to SavvyO Seller',
//     text: 'Your Login Credentials'
// };

// sendMail(sellerWelcome);
