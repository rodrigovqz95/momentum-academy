import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Profile from './AccountScreen'
import NewsList from "./NewsList";
import ListaObjetivos from "./ListaObjetivos";
import NuevoObjetivo from "./NuevoObjetivo";
import AddNews from "./AddNews";
import {styles} from "../components/Styles";

const AdminScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      alert(error.mesasge);
    }
  };

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
          name="Noticias"
          component={ListaObjetivos}
          options={{
            tabBarLabel: 'Noticias',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Metas"
          component={NuevoObjetivo}
          options={{
            tabBarLabel: 'Metas',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="staro" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Reportes"
          component={NewsList}
          options={{
            tabBarLabel: 'Reportes',
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
