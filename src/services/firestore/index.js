import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { collection, setDoc, getDocs, doc, where, query } from "firebase/firestore";
import { getFirestore, collection, getDocs, where, query, runTransaction, doc } from "firebase/firestore";
// import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";

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

export const getCandidatos = async (tipo) => {
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

export const getPartidos = async () => {
    const citiesRef = collection(db, 'partidos');
    const q = query(citiesRef, where("user", "==", "TeD17ypqtLtI3tU52TOA"));
    const querySnapshot = await getDocs(q);
    let partidos = {}
    querySnapshot.forEach((doc) => {
        partidos[doc.data()?.numero] = {
            nome: doc.data()?.nome,
        }
    });
    return partidos
}

export const setVote = async (tela, numCandidato) => {
    console.log('# armazenando voto no DB...');
    let nameDoc = ''
    if (tela === 'prefeito') nameDoc = 'prefeitos'
    if (tela === 'vereador') nameDoc = 'vereadores'

    console.log('# NumeroVoto: ', numCandidato);

    const candidato = await getCandidato(nameDoc, numCandidato)
    console.log('# get candidato: ', candidato);

    const candRef = collection(db, nameDoc);
    const q = query(candRef, where("numero", "==", Number(numCandidato)));
    const sfDocRef = doc(candRef, q);
    // const sfDocRef = doc(db, nameDoc, candidato.numero);

    try {
        await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
                throw "Document does not exist!";
            }

            const newPopulation = sfDoc.data().votos + 1;
            transaction.update(sfDocRef, { votos: newPopulation });
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}

export const getCandidato = async (tipo, numCandidato) => {
    console.log('# Obtendo candidato apartir do DB... ', numCandidato);
    console.log('# tipo: ', tipo);
    console.log('# numCandidato: ', numCandidato);
    const candRef = collection(db, tipo);
    const q = query(candRef, where("numero", "==", Number(numCandidato)));
    const querySnapshot = await getDocs(q);
    console.log('# querySnapshot: ', querySnapshot);
    let candidato = {}
    querySnapshot.forEach((doc) => {
        console.log(doc);
        candidato = {
            nome: doc.data()?.nome,
            numero: doc.data()?.numero,
            votos: doc.data()?.votos,
            partido: doc.data()?.partido,
            imagem: doc.data()?.imagem
        }
    });
    console.log('# Candidato: ', candidato);
    return candidato
}