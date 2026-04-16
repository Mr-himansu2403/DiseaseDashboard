const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * Stores data in the "Diecue_kit" collection.
 * @param {Object} data - The data to store.
 * @returns {Promise<string>} - The ID of the created document.
 */
async function storeData(data) {
  try {
    const res = await db.collection('Diecue_kit').add({
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('Data stored successfully with ID:', res.id);
    return res.id;
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
}

module.exports = { admin, db, storeData };
