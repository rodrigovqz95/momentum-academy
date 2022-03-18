import { database, firestore } from '../firebase';
import {
  getOneYearAgoFromToday,
  get30DaysAgoFromToday,
  get90DaysAgoFromToday,
  getDateFromFirestoreTimestamp,
  startAndEndOfWeek,
} from '../utils/dates_utils.js';

export const createNewObjetivo = async (objetivoData) => {
  await firestore.collection('Objetivos').add(objetivoData);
};

export const getAcumuladosObjetivos = async (periodo) => {
  let objetivos = [];

  let cantidadInvitadosEventos = {
    logrado: 0,
    esperado: 0,
  };
  let cantidadInvitadosPersonales = {
    logrado: 0,
    esperado: 0,
  };
  let cantidadPersonasPatrocinadas = {
    logrado: 0,
    esperado: 0,
  };
  let cantidadPosteos = {
    logrado: 0,
    esperado: 0,
  };
  let cantidadPresentaciones = {
    logrado: 0,
    esperado: 0,
  };
  let cantidadProductosVender = {
    logrado: 0,
    esperado: 0,
  };
  let personasConocerSemana = {
    logrado: 0,
    esperado: 0,
  };
  let personasContactar = {
    logrado: 0,
    esperado: 0,
  };
  let horasLectura = {
    logrado: 0,
    esperado: 0,
  };

  const limitDate =
    periodo == 30
      ? get30DaysAgoFromToday()
      : periodo == 90
      ? get90DaysAgoFromToday()
      : getOneYearAgoFromToday();

  const snapshots = await firestore
    .collection('Objetivos')
    .where('createdAt', '>', limitDate)
    .get();

  snapshots.forEach((doc) => {
    const objetivo = doc.data();
    const id = doc.id;
    objetivo.id = id;
    objetivos.push(objetivo);
  });

  if (objetivos.length == 0) {
    return null;
  }

  objetivos = JSON.parse(JSON.stringify(objetivos));

  objetivos.forEach((objetivo) => {
    cantidadInvitadosEventos.esperado += parseInt(
      objetivo.cantidadInvitadosEventos.esperado || 0
    );
    cantidadInvitadosEventos.logrado += parseInt(
      objetivo.cantidadInvitadosEventos.logrado || 0
    );
    cantidadInvitadosPersonales.esperado += parseInt(
      objetivo.cantidadInvitadosPersonales.esperado || 0
    );
    cantidadInvitadosPersonales.logrado += parseInt(
      objetivo.cantidadInvitadosPersonales.logrado || 0
    );
    cantidadPersonasPatrocinadas.esperado += parseInt(
      objetivo.cantidadPersonasPatrocinadas.esperado || 0
    );
    cantidadPersonasPatrocinadas.logrado += parseInt(
      objetivo.cantidadPersonasPatrocinadas.logrado || 0
    );
    cantidadPosteos.esperado += parseInt(
      objetivo.cantidadPosteos.esperado || 0
    );
    cantidadPosteos.logrado += parseInt(objetivo.cantidadPosteos.logrado || 0);
    cantidadPresentaciones.esperado += parseInt(
      objetivo.cantidadPresentaciones.esperado || 0
    );
    cantidadPresentaciones.logrado += parseInt(
      objetivo.cantidadPresentaciones.logrado || 0
    );
    cantidadProductosVender.esperado += parseInt(
      objetivo.cantidadProductosVender.esperado || 0
    );
    cantidadProductosVender.logrado += parseInt(
      objetivo.cantidadProductosVender.logrado || 0
    );
    horasLectura.esperado += parseInt(objetivo.horasLectura.esperado || 0);
    horasLectura.logrado += parseInt(objetivo.horasLectura.logrado || 0);
    personasConocerSemana.esperado += parseInt(
      objetivo.personasConocerSemana.esperado || 0
    );
    personasConocerSemana.logrado += parseInt(
      objetivo.personasConocerSemana.logrado || 0
    );
    personasContactar.esperado += parseInt(
      objetivo.personasContactar.esperado || 0
    );
    personasContactar.logrado += parseInt(
      objetivo.personasContactar.logrado || 0
    );
  });

  const acumuladoObjetivos = {
    cantidadInvitadosEventos,
    cantidadInvitadosPersonales,
    cantidadPersonasPatrocinadas,
    cantidadPosteos,
    cantidadPresentaciones,
    cantidadProductosVender,
    horasLectura,
    personasConocerSemana,
    personasContactar,
  };

  return JSON.parse(JSON.stringify(acumuladoObjetivos));
};

export const getObjetivosByUserId = async (id) => {
  let objetivosUsuario = [];

  const snapshots = await firestore
    .collection('Objetivos')
    .where('userId', '==', id)
    .orderBy('createdAt', 'desc')
    .get();

  snapshots.forEach((doc) => {
    const objetivo = doc.data();
    const id = doc.id;
    objetivo.id = id;
    objetivosUsuario.push(objetivo);
  });

  return JSON.parse(JSON.stringify(objetivosUsuario));
};

export const getMostRecentObjetivoByUserId = async (id) => {
  let objetivosUsuario = [];

  const { start, end } = startAndEndOfWeek(new Date());

  const snapshots = await firestore
    .collection('Objetivos')
    .where('userId', '==', id)
    .where('createdAt', '>', start)
    .where('createdAt', '<', end)
    .orderBy('createdAt')
    .get();

  snapshots.forEach((doc) => {
    const objetivo = doc.data();
    const id = doc.id;
    objetivo.id = id;
    objetivosUsuario.push(objetivo);
  });

  return objetivosUsuario.length > 0
    ? JSON.parse(JSON.stringify(objetivosUsuario[0]))
    : null;
};

export const getObjetivosByObjetivoId = async (objetivoId) => {
  const doc = await firestore.collection('Objetivos').doc(objetivoId).get();
  const objetivo = doc.data();

  return JSON.parse(JSON.stringify(objetivo));
};

export const updateObjetivoById = async (objetivoId, dataObjetivo) => {
  dataObjetivo.startOfWeek = getDateFromFirestoreTimestamp(
    dataObjetivo.startOfWeek
  );
  dataObjetivo.endOfWeek = getDateFromFirestoreTimestamp(
    dataObjetivo.endOfWeek
  );
  dataObjetivo.createdAt = getDateFromFirestoreTimestamp(
    dataObjetivo.createdAt
  );

  const objetivoRef = firestore.collection('Objetivos').doc(objetivoId);
  objetivoRef.update(dataObjetivo);
};

export const deleteObjetivo = async (objetivo) => {
  try {
    const data = await firestore.collection('Objetivos').doc(objetivo.id);

    data.delete();

    return await getObjetivosByUserId(objetivo.userId);
  } catch (error) {
    console.log(error);
  }
};
