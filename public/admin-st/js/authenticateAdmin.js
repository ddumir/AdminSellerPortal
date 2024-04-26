// authenticateAdmin.js

const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Middleware function to verify admin status
const verifyAdmin = (req, res, next) => {
    const idToken = req.headers.authorization;

    if (!idToken) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            if (decodedToken.isAdmin === true) {
                // User is an admin, grant access
                req.user = decodedToken;
                next();
            } else {
                // User is not an admin, deny access
                return res.status(403).json({ error: 'Unauthorized' });
            }
        })
        .catch(error => {
            console.error('Error verifying ID token:', error);
            return res.status(403).json({ error: 'Unauthorized' });
        });
};

module.exports = verifyAdmin;
