import React from "react";
import { StyleSheet,
        Text,
        View,
        SafeAreaView,
        Image,
        TextInput,
        ScrollView,
        Button,
        TouchableOpacity} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import {addNews, getNews} from '../api/NewsApi';

export default function AccountScreen(){

    const navigation = useNavigation();

    const handleSignOut = async () => {
        try {
          await auth.signOut();
          navigation.replace("Login");
        } catch (error) {
          alert(error.mesasge);
        }
      };

    const handleChangePass = async () => {
        navigation.replace('ChangePass');
      };
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.statsContainer}>
                    <View style={styles.container}>
                        <Text>Correo:</Text>
                        <Text>{auth.currentUser?.email}</Text>
                        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleChangePass}>
                            <Text style={styles.buttonText}>Cambiar Contraseña</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
        margin: 10
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
    button: {
        backgroundColor: "#0782F9",
        width: "60%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
      },
});