import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {registerForPushNotificationsAsync} from '../api/NotificationsAPI'
import AntDesign from 'react-native-vector-icons/AntDesign';

import Profile from './AccountScreen';
import ListaObjetivos from './ListaObjetivos';
import NuevoObjetivo from './NuevoObjetivo';
import HistorialScreen from './HistorialScreen';
import NewsList from './NewsList';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen = () => {
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      alert(error.mesasge);
    }
  };

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

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'black',
          borderRadius: 15,
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Noticias"
        component={NewsList}
        options={{
          tabBarLabel: 'Noticias',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
          title: 'Noticias',
        }}
      />
      <Tab.Screen
        name="Nuevo Objetivo"
        component={NuevoObjetivo}
        options={{
          tabBarLabel: 'Objetivos',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="staro" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reportes"
        component={ListaObjetivos}
        options={{
          tabBarLabel: 'Mis Objetivos',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" color={color} size={size} />
          ),
          title: 'Mis Objetivos',
        }}
      />
      <Tab.Screen
        name="Historial"
        component={HistorialScreen}
        options={{
          tabBarLabel: 'Historial',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cuenta"
        component={Profile}
        options={{
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
