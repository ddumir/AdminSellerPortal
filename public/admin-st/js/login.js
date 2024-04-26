const firebaseConfig = {
    apiKey: "yourconfig",
    authDomain: "yourconfig",
    databaseURL: "yourconfig",
    projectId: "yourconfig",
    storageBucket: "yourconfig",
    messagingSenderId: "yourconfig",
    appId: "yourconfig",
    measurementId: "yourconfig"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        // Call authentication function passing email and password
        authenticateUser(email, password);
    });
});

function authenticateUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirect to index.html if user is admin
            checkAdminStatus(userCredential.user);
        })
        .catch((error) => {
            console.error('Authentication error:', error);
        });
}

function checkAdminStatus(user) {
    user.getIdTokenResult()
        .then((idTokenResult) => {
            if (idTokenResult.claims.isAdmin) {
                // User is admin, redirect to index.html
                window.location.href = 'index.html';
            } else {
                console.log('User is not an admin');
                // Handle non-admin user (optional)
            }
        })
        .catch((error) => {
            console.error('Error getting ID token:', error);
        });
}
