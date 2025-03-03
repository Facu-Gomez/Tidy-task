// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-J8EwYzQwz6FSgeKLeEDLK6gW9ebgudA",
    authDomain: "tidy-task.firebaseapp.com",
    projectId: "tidy-task",
    storageBucket: "tidy-task.appspot.com",
    messagingSenderId: "632577921694",
    appId: "1:632577921694:web:31a81a7dd77c69f8c9618f"
};



// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

// Inicializar Firestore
const db = getFirestore(app);

// Exportar la instancia de db
export { db };