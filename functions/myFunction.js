// functions/paymentCallback.js
require('dotenv').config({path: './.env'})
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "spellwork-a66fe",
    "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
    "universe_domain": "googleapis.com"
  }),
  databaseURL: "https://spellwork-a66fe-default-rtdb.firebaseio.com"
});

exports.handler = async (event, context) => {
  try {
    const { userId } = event.queryStringParameters; // Extract userId from query parameters

    // Get a reference to the Firestore document for the user
    const userRef = admin.firestore().collection('user').doc(userId);

    // Update the subscription field to true
    await userRef.update({ subscription: true });

    return {
      statusCode: 200,
      body: 'Payment processed successfully',
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
