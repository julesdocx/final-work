const admin = require('firebase-admin');

// Initialize our project application
admin.initializeApp();

// Set up database connection
const firestoreDb = admin.firestore();
firestoreDb.settings({ timestampsInSnapshots: true });

// Export our references
module.exports = {firestoreDb};