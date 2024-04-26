// // // Import Firebase configuration
// import firebaseConfig from '../../firebase-config.js';

// // Import Firebase SDK
// const firebase = require('firebase/app'); // Import only the firebase namespace (core functionality)
// require('firebase/auth'); // Import Firebase Auth module

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Your remaining JavaScript code here
// const loginForm = document.getElementById('loginForm');
// const errorDisplay = document.getElementById('errorDisplay');

// loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault(); // Prevent form submission

//     // Get user input
//     const email = loginForm['email'].value;
//     const password = loginForm['password'].value;

//     try {
//         // Your authentication logic here
//         // Redirect the user after successful authentication
//         console.log('Signed up succefully');
//         //window.location.href = '/Seller/verify_page.html';
//     } catch (error) {
//         // Handle authentication errors
//         console.error('Authentication error:', error.message);
//         errorDisplay.innerText = error.message;
//     }
// });
