import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Text, View, Button, Platform } from 'react-native';
import { firestore } from '../firebase';
import uuid from 'react-native-uuid';

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
export async function sendPushNotification(mes, expoPushToken) {

  var snapshot = await firestore
  .collection('PushNotificationToken')
  .get();

 snapshot.forEach((doc) => {
    const message = {
      to: doc.data().value,
      sound: 'default',
      title: 'Momentum Academy',
      body: mes,
      data: { someData: 'goes here' },
    };
   console.log(doc.data().value)

   fetch('https://exp.host/--/api/v2/push/send', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Accept-encoding': 'gzip, deflate',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(message),
   });
});
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  try {
    const newid = token;
    const data = await firestore
      .collection('PushNotificationToken')
      .doc(newid)
      .set({
        value: token
      });
  } catch (error) {
    console.log(error);
  }
  return token;
}