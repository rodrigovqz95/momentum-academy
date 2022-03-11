import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar"
import * as firebase from "firebase";

export function addNews(news, addComplete){

    firebase.firestore()
    .collection("Noticias")
    .add({
        text: news.text,
        pushNotifications: news.pushNotifications,
        createdDate: firebase.firestore.FieldValue.serverTimestamp(),
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error));
}

export async function getNews(newsRetrieved){

var newsList = [];
var snapshot = await firebase.firestore()
.collection("Noticias")
.orderBy('createdDate')
.get()

snapshot.forEach((doc) => {
newsList.push(doc.data())
});

newsRetrieved(newsList);
}