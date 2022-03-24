import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    Button,
    SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {addNews, getNews} from '../api/NewsApi';
import {styles} from '../components/Styles';
import * as Notifications from 'expo-notifications';
import {sendPushNotification, registerForPushNotificationsAsync} from '../api/NotificationsAPI'
import { useNavigation } from '@react-navigation/core';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const AddNews = () => {
    const [nuevaNoticia, setNuevaNoticia] = useState({});
    const [color, setColor] = useState("red");
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const navigation = useNavigation();

    const state = {
        ...nuevaNoticia,
        newsList: [],
        currentNewsItem: "",
        color: "blue",
    };

    addNews(state);

    const onNewsAdded = (news) => {
        console.log("News Added");
        console.log("news");
        navigation.replace("Admin")
    };

    useFocusEffect(
        useCallback(() => {
          const gettingNews = async () => {
            setIsLoading(true);
            const noticiasUsuario = await getNews();
            setIsLoading(false);
          };
    
          gettingNews();
        })
      );

      useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
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

    return(
        <SafeAreaView>
            <View style={styles.inputContainer}>
            <TextInput
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholder="Escribe Nueva Noticia"
            value={nuevaNoticia.currentNewsItem}
            onChangeText={(text) => setNuevaNoticia({
                ...nuevaNoticia,
                currentNewsItem: text})
            } />
            </View>
            <View style={styles.recentItem}>
            <Button
                title= 'Agregar Noticia'
                style={styles.button}
                onPress={() =>
                  addNews({
                    text: nuevaNoticia.currentNewsItem,
                    pushNotifications: 0,
                },
                onNewsAdded()
                )
                }
            />
            <Button
                title= 'Push Notifications'
                color={color}
                style={styles.button}
                onPress={() =>
                {
                    setColor(color==="red" ? "green":"red"),
                    setNotification(notification ? false: true)
                    sendPushNotification(nuevaNoticia.currentNewsItem, expoPushToken)
                    alert("Noticia Ha Sido Enviada Por Push")
                }
                } 
            />
            </View>
        </SafeAreaView>
    );
}
  export default AddNews;

