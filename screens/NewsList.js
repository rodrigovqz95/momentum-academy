import React, { useState, useEffect, useCallback, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { getNews } from '../api/NewsApi';
import { styles } from '../components/Styles';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../api/NotificationsAPI'
import { auth } from '../firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NewsList = () => {
  const [newsList, setNoticia] = useState([]);
  const [color, setColor] = useState("blue");
  const [currentNewsItem, setNewsItem] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState('');
  const userId = auth.currentUser.uid;
  const onNewsDeleted = (news) => {
    console.log('News Deleted');
  };

  const onNewsReceived = (newsList) => {
    setNoticia(newsList);
  };

  useEffect(() => {
    registerForPushNotificationsAsync(userId).then(token => setExpoPushToken(token));
    getNews().then(news => setNoticia(news));
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    return (
      <SafeAreaView>
        <FlatList
          data={newsList}
          ItemSeparatorComponent={() => (
            <Divider style={{ setStatusBarBackgroundColor: 'black' }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                containerStyle={[styles.listContainer, styles.shadowProp]}
              >
                <ListItem.Title style={styles.inputLabel}>
                  {item.dateDisplay}
                </ListItem.Title>
                <ListItem.Title style={styles.inputMessage}>
                  {item.text}
                </ListItem.Title>
              </ListItem>
            );
          }}
        />
      </SafeAreaView>
    );
}

export default NewsList;
