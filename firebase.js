// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAG-qO8JxCBJilRuxDtDAJdDdezkVAeOiE',
  authDomain: 'momentum-academy.firebaseapp.com',
  projectId: 'momentum-academy',
  databaseURL: 'https://momentum-academy-default-rtdb.firebaseio.com/',
  storageBucket: 'momentum-academy.appspot.com',
  messagingSenderId: '933630017400',
  appId: '1:933630017400:web:6d0090082e6c23e8ed128d',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const database = firebase.database();

export { auth, database };
