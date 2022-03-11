import { database } from '../firebase';

export const getObjetivosByUserId = async (id) => {
  const objetivosUsuarioRef = database.ref(`objetivos/${id}`);
  const datos = await objetivosUsuarioRef.get();

  const objetivosUsuario = [];

  datos.forEach((data) => {
    const objetivo = data.val();
    objetivo.id = data.key;
    objetivosUsuario.push(objetivo);
  });

  return objetivosUsuario;
};

export const getObjetivosByObjetivoId = async (userId, objetivoId) => {
  const objetivoRef = database.ref(`objetivos/${userId}/${objetivoId}`);
  const datos = await objetivoRef.get();
  return JSON.parse(JSON.stringify(datos));
};

export const updateObjetivoById = async (userId, objetivoId, dataObjetivo) => {
  const objetivoRef = database.ref(`objetivos/${userId}/${objetivoId}`);
  objetivoRef.update(dataObjetivo);
};
