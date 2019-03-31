

var config = {
    apiKey: PROCESS.ENV.FIREBASE_API_KEY,
    authDomain: PROCESS.ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: PROCESS.ENV.FIREBASE_DATABASE,
    projectId: PROCESS.ENV.FIREBASE_PROJECT_ID,
    storageBucket: PROCESS.ENV.FIREBASE_STORAGE,
    messagingSenderId: PROCESS.ENV.FIREBASE_SENDING_ID
};
firebase.initializeApp(config);

module.exports.config = config;
