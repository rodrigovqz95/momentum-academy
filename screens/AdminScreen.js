import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Profile from './AccountScreen'
import NewsListAdmin from "./NewsListAdmin";
import PushNotif from "./PushNotifications";
import ListaObjetivos from "./ListaObjetivos";
import NuevoObjetivo from "./NuevoObjetivo";
import AddNews from "./AddNews";
import {styles} from "../components/Styles";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        tabBarOptions={
          {showLabel: false,
           showIcon: true,
          style: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: 'black',
            borderRadius: 15,
            height: 90 
          }}
        }
      >
        <Tab.Screen
          name="Noticias Admin"
          component={NewsListAdmin}
          options={{
            tabBarLabel: 'Noticias Admin',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="book" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Agregar Noticia"
          component={AddNews}
          options={{
            tabBarLabel: 'Agregar Noticia',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="bells" color={color} size={size} />
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
