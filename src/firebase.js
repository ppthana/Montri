import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite'
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD-l0_8-8pWb3c9cWoo4zDnYzsjA7TlXRY",
    authDomain: "motopart-demo.firebaseapp.com",
    databaseURL: "https://motopart-demo-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "motopart-demo",
    storageBucket: "motopart-demo.appspot.com",
    messagingSenderId: "752871874265",
    appId: "1:752871874265:web:628b220e0d4d3cfb1528c8"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

const auth = getAuth();
connectAuthEmulator(auth, 'http://127.0.0.1:9099');

const storage = getStorage()
connectStorageEmulator(storage, '127.0.0.1', 9199)


export {
    db,
    auth,
    storage
}
