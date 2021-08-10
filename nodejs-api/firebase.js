const admin = require('firebase-admin');
const serviceAccount = require('./lib/config/config.json');

// Initialize our project application
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Set up database connection
const firestoreDb = admin.firestore();
firestoreDb.settings({ timestampsInSnapshots: true });

// Export our references
module.exports = {firestoreDb};
