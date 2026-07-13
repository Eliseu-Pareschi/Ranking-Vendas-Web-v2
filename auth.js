import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
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
const formLogin = document.getElementById("formLogin");
const emailLogin = document.getElementById("emailLogin");
const senhaLogin = document.getElementById("senhaLogin");

const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");

formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    erroEmail.textContent = "";
    erroSenha.textContent = "";

    const email = emailLogin.value;
    const senha = senhaLogin.value;

    try {
        await signInWithEmailAndPassword(auth, email, senha);

        window.location.href = "admin.html";

    } catch (erro) {
        erroSenha.textContent = "E-mail ou senha incorretos.";
    }
});