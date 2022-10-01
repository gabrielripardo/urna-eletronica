/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, where, query, doc, setDoc, firebase } from "firebase/firestore";

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

async function storeVoteDB(candidato) {
    const docRef = doc(db, "prefeitos", candidato.key);
    await setDoc(docRef, { votos: candidato.votos }, { merge: true })
        .then(() => {
            console.log("Ok!");
        }).catch((error) => {
            console.log(error);
        })

    // runTransaction(postRef, (post) => {
    //     if (post) {
    //         if (post && post[uid]) {
    //             post.votos--;
    //             post[uid] = null;
    //         } else {
    //             post.votos++;
    //             if (!post.votos) {
    //                 post.votos = {};
    //             }
    //             post[uid] = true;
    //         }
    //     }
    //     return post;
    // });
}

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
    let nameDoc = ''
    if (tela === 'prefeito') nameDoc = 'prefeitos'
    if (tela === 'vereador') nameDoc = 'vereadores'


    const candidato = await getCandidato(nameDoc, numCandidato)
    candidato.votos += 1;

    storeVoteDB(candidato)
}

export const getCandidato = async (tipo, numCandidato) => {
    const candRef = collection(db, tipo);
    const q = query(candRef, where("numero", "==", numCandidato != null ? Number(numCandidato) : numCandidato));
    const querySnapshot = await getDocs(q);
    let candidato = {}
    querySnapshot.forEach((doc) => {
        if (!candidato?.key) {
            candidato = { ...candidato, key: doc['_key']['path']['segments'][6] }
        }
        candidato = {
            ...candidato,
            nome: doc.data()?.nome,
            numero: doc.data()?.numero,
            votos: doc.data()?.votos,
            partido: doc.data()?.partido,
            imagem: doc.data()?.imagem
        }
    });
    return candidato
}