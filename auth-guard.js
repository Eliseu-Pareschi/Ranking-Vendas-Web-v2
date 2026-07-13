import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA9hFh5RJe302B1C6gutSRRAxOMCynIE1U",
    authDomain: "rankingvendasweb.firebaseapp.com",
    databaseURL: "https://rankingvendasweb-default-rtdb.firebaseio.com",
    projectId: "rankingvendasweb",
    storageBucket: "rankingvendasweb.firebasestorage.app",
    messagingSenderId: "215981763568",
    appId: "1:215981763568:web:5d656f32388bc7d7fd8b35",
    measurementId: "G-G4SZZHC93C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (usuario) => {
    if (!usuario) {
        window.location.href = "index.html";
    }
});