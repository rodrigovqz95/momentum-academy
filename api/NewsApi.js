import { firestore } from '../firebase';
import uuid from 'react-native-uuid';

export const addNews = async (news, addComplete) => {
  try {

    const newid = uuid.v4()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    const data = await firestore.collection('Noticias').doc(newid).set({
      text: news.text,
      pushNotifications: news.pushNotifications,
      id: newid,
      createdDate: new Date(),
      monthDate: month,
      dayDate: day,
      dateDisplay: day + "/" + month,
    });

    addComplete(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteNews = async (item, newsDeleted) => {
  try {
    console.log(item)
    const data = await firestore.collection('Noticias').doc(item)

    data.delete();

    newsDeleted(data);
  } catch (error) {
    console.log(error);
  }
};

export const getNews = async (newsRetrieved) => {
  var newsList = [];
  var snapshot = await firestore
    .collection('Noticias')
    .orderBy('createdDate')
    .get();

  snapshot.forEach((doc) => {
    newsList.push(doc.data());
  });

  newsRetrieved(newsList);
};
