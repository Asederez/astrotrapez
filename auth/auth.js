// ---- Firebase config (twój prawdziwy kod) ----
const firebaseConfig = {
  apiKey: "AIzaSyDpZ556xcaHnOKeH9r_nV-AJNh7zQO-BHs",
  authDomain: "astrotrapez.firebaseapp.com",
  projectId: "astrotrapez",
  storageBucket: "astrotrapez.firebasestorage.app",
  messagingSenderId: "313155639463",
  appId: "1:313155639463:web:62f4928dfa2c6347d02382",
  measurementId: "G-1FYDH1YYR8"
};

// ---- Firebase SDK (ESM z CDN) ----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import {
  getAuth, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  updateProfile, signOut, GoogleAuthProvider, signInWithPopup,
  sendPasswordResetEmail, sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// helpers
const $ = (q) => document.querySelector(q);
const setMsg = (el, text, ok=false) => {
  const n = $(el);
  if(!n) return;
  n.classList.remove('ok','err');
  if(!text){ n.textContent = ''; return; }
  n.textContent = text;
  n.classList.add(ok ? 'ok' : 'err');
};

// elementy
const loginEmail = $('#loginEmail');
const loginPass  = $('#loginPass');
const loginMsg   = $('#loginMsg');
const regName    = $('#regName');
const regEmail   = $('#regEmail');
const regPass    = $('#regPass');
const regMsg     = $('#regMsg');

const toAppBtn   = $('#toApp');
const logoutBtn  = $('#logoutBtn');
const googleBtn  = $('#googleBtn');
const forgotBtn  = $('#forgotBtn');
const verifyBtn  = $('#verifyBtn');
const whoami     = $('#whoami');

const redirectTarget = new URLSearchParams(location.search).get('redirect') || '/';

// logowanie email/hasło
$('#loginBtn')?.addEventListener('click', async () => {
  setMsg('#loginMsg','');
  try{
    await signInWithEmailAndPassword(auth, loginEmail.value.trim(), loginPass.value);
    location.href = redirectTarget;
  }catch(e){
    setMsg('#loginMsg', e.message);
  }
});

// Google login
googleBtn?.addEventListener('click', async () => {
  setMsg('#loginMsg','');
  try{
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    location.href = redirectTarget;
  }catch(e){
    setMsg('#loginMsg', e.message);
  }
});

// rejestracja
$('#regBtn')?.addEventListener('click', async () => {
  setMsg('#regMsg','');
  try{
    const cred = await createUserWithEmailAndPassword(auth, regEmail.value.trim(), regPass.value);
    if (regName.value.trim()) {
      await updateProfile(cred.user, { displayName: regName.value.trim() });
    }
    try{ await sendEmailVerification(cred.user); }catch{}
    location.href = redirectTarget;
  }catch(e){
    setMsg('#regMsg', e.message);
  }
});

// reset hasła
forgotBtn?.addEventListener('click', async () => {
  setMsg('#loginMsg','');
  const email = (loginEmail.value || regEmail.value || '').trim();
  if(!email){ setMsg('#loginMsg','Podaj e-mail.'); return; }
  try{
    await sendPasswordResetEmail(auth, email);
    setMsg('#loginMsg','Wysłano link do resetu hasła.', true);
  }catch(e){ setMsg('#loginMsg', e.message); }
});

// wysyłka maila weryfikacyjnego
verifyBtn?.addEventListener('click', async () => {
  setMsg('#loginMsg','');
  const user = auth.currentUser;
  if(!user){ setMsg('#loginMsg','Zaloguj się, aby wysłać weryfikację.'); return; }
  try{
    await sendEmailVerification(user);
    setMsg('#loginMsg','E-mail weryfikacyjny wysłany.', true);
  }catch(e){ setMsg('#loginMsg', e.message); }
});

// wylogowanie
logoutBtn?.addEventListener('click', async () => {
  try{ await signOut(auth); }catch{}
});

// na stronę główną
toAppBtn?.addEventListener('click', ()=> location.href = '/');

// śledzenie stanu użytkownika
onAuthStateChanged(auth, user => {
  if(user){
    whoami.textContent = `Zalogowano: ${user.displayName || user.email}`;
    localStorage.setItem('astro_user', JSON.stringify({
      uid:user.uid, name:user.displayName, email:user.email
    }));
  }else{
    whoami.textContent = 'Nie zalogowano';
    localStorage.removeItem('astro_user');
  }
});
