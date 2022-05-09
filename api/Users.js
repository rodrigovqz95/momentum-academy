import { firestore } from '../firebase';
import uuid from 'react-native-uuid';
import { checkFinalObjetivo } from '../api/ObjetivosApi';

export const addUser = async (users, addComplete) => {
  try {
    const newid = uuid.v4();
    const data = await firestore
      .collection('Usuarios')
      .doc(newid)
      .set({
        correo: users.correo,
        userId: users.userId
      });

    addComplete(data);
  } catch (error) {
    console.log(error);
  }
};

export const getReminderObj = async () => {
  var userList = [];
  var snapshot = await firestore
    .collection('Usuarios')
    .orderBy('correo')
    .get();

  snapshot.forEach((doc) => {
    userList.push(doc.data());
    const data = doc.data();
    if (data.correo == "rodrigo@rodrigo.com"){
      checkFinalObjetivo(data.userId);
      console.log("notification sent to user")
    }
  });
  return userList;
};

export const getUsers = async (usersRetrieved) => {
  var userList = [];
  var snapshot = await firestore
    .collection('Usuarios')
    .orderBy('correo')
    .get();

  snapshot.forEach((doc) => {
    userList.push(doc.data());
    const data = doc.data();
  });

  return userList;
};