// setAdminClaims.js

const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Function to set custom claim isAdmin for admin users
const setAdminClaims = async (uid) => {
    try {
        await admin.auth().setCustomUserClaims(uid, { isAdmin: true });
        console.log('Custom claim set for admin user:', uid);
    } catch (error) {
        console.error('Error setting custom claim:', error);
    }
};

// Call the function to set custom claim for admin user
setAdminClaims('k8BG73h25aNbK5gnMUBuwA9TA6T2');
// Add more admin users as needed by calling setAdminClaims with their respective UIDs
