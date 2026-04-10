import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function sendAlert(alert) {
  await addDoc(collection(db, "alerts"), alert);
}

export function listenAlerts(callback) {
  onSnapshot(collection(db, "alerts"), (snapshot) => {
    const alerts = [];
    snapshot.forEach(doc => alerts.push(doc.data()));
    callback(alerts);
  });
}