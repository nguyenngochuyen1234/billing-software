// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArWR_51qbSyDvyS0XFpK8CO1elX_AzJv0",
  authDomain: "billing-software-635d6.firebaseapp.com",
  projectId: "billing-software-635d6",
  storageBucket: "billing-software-635d6.appspot.com",
  messagingSenderId: "828963380811",
  appId: "1:828963380811:web:66a2e6922ca8fa16ef37ce"
};


const app = initializeApp(firebaseConfig)
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})
const db = getFirestore(app)

export default db
