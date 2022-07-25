import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { collection, setDoc, getDocs, doc, where, query } from "firebase/firestore";
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCXCoyUCV2MnEcC2CX4ZyiJ1CBf9NWbP14",
    authDomain: "urna-eletronica-2f949.firebaseapp.com",
    projectId: "urna-eletronica-2f949",
    storageBucket: "urna-eletronica-2f949.appspot.com",
    messagingSenderId: "312415667196",
    appId: "1:312415667196:web:fbde65fecb048c37856879",
    measurementId: "G-HJ6MWDJHTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log('# analytics: ', analytics);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const readData = async (tipo) => {
    const citiesRef = collection(db, tipo);
    const q = query(citiesRef, where("user", "==", "TeD17ypqtLtI3tU52TOA"));
    const querySnapshot = await getDocs(q);
    let candidates = {}
    querySnapshot.forEach((doc) => {
        candidates[doc.data()?.numero] = {
            votos: doc.data()?.votos,
            nome: doc.data()?.nome,
            partido: doc.data()?.partido,
            imagem: doc.data()?.imagem
        }
    });
    return candidates
}
