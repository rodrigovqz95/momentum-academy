import { database, firestore } from '../firebase';

export const createNewObjetivo = async (objetivoData) => {
  await firestore.collection('Objetivos').add(objetivoData);
};

export const getObjetivosByUserId = async (id) => {
  let objetivosUsuario = [];

  const snapshots = await firestore
    .collection('Objetivos')
    .where('userId', '==', id)
    .orderBy('createdAt')
    .get();

  snapshots.forEach((doc) => {
    const objetivo = doc.data();
    const id = doc.id;
    objetivo.id = id;
    objetivosUsuario.push(objetivo);
  });

  return JSON.parse(JSON.stringify(objetivosUsuario));
};

export const getObjetivosByObjetivoId = async (objetivoId) => {
  const doc = await firestore.collection('Objetivos').doc(objetivoId).get();
  const objetivo = doc.data();

  return JSON.parse(JSON.stringify(objetivo));
};

export const updateObjetivoById = async (objetivoId, dataObjetivo) => {
  const objetivoRef = firestore.collection('Objetivos').doc(objetivoId);
  objetivoRef.update(dataObjetivo);
};
