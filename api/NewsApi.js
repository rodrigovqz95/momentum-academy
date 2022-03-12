import { firestore } from '../firebase';

export const addNews = async (news, addComplete) => {
  try {
    const data = await firestore.collection('Noticias').add({
      text: news.text,
      pushNotifications: news.pushNotifications,
      createdDate: new Date(),
      monthDate: new Date().getMonth(),
      dayDate: new Date().getDay(),
      dateDisplay: new Date().getDay() + "/" + new Date().getMonth(),
    });

    addComplete(data);
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
