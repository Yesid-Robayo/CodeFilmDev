import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyArADCIZyWSc01SM_ZdfpKsV52Yg0v2Vak",
  authDomain: "codefilmdev-11.firebaseapp.com",
  projectId: "codefilmdev-11",
  storageBucket: "codefilmdev-11.appspot.com",
  messagingSenderId: "82906269171",
  appId: "1:82906269171:web:3048c7dd7acb22b6433e86",
  measurementId: "G-1455M9871C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { db, storage };
