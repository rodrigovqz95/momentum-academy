import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {

      if (user) {
        if (user.email === 'test@tester.com') {
          navigation.replace('Admin');
        } else {
          navigation.replace('Home');
        }

      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    navigation.replace('SignUp');
  };

  const handleForgotPassword = async () => {
    navigation.replace('ForgotPass');
  };

  const loginHandler = async () => {
    const userCredentials = await auth.signInWithEmailAndPassword(
      email,
      password
    ).catch(function(error) {
      errorCode = error.code;
      errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    if (errorCode === "auth/wrong-password") {
      console.log(errorCode);
      alert('Contraseña o Usuario Incorrecto!');
    } if (errorCode === "auth/user-not-found") {
      console.log(errorCode);
      alert('Usuario No Encontrado.');
    } if (errorCode === "auth/too-many-requests") {
      alert('La Cuenta Ha Sido Bloqueada Por Demasiados Intentos De Accesarla. Para recuperarla favor de cambiar contraseña.');
    };});
    const user = userCredentials.user;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoImage}>
        <Image
          source={require('../assets/logo-momentum-academy.png')}
          style={styles.image}
          resizeMode="contain"
        ></Image>
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.mainText}>
            {'¡Bienvenido A La App De Seguimiento De Momentum Academy!'}
          </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Correo"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
          onPress={handleForgotPassword}
          style={[styles.button, styles.buttonOutline]}
          >
          <Text style={styles.buttonOutlineTextRight}>
            {`¿Olvidaste La Contraseña?`}
          </Text>
        </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={loginHandler} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {`¿No tienes cuenta?\n¡Registrate aquí!`}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    marginTop: 5,
    borderColor: '#0782F9',
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonOutlineTextRight: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'right',
  },
  mainText: {
    color: '#0782F9',
    fontWeight: '300',
    fontSize: 14,
    textAlign: 'justify',
    paddingBottom: 10
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  logoImage: {
    width: 250,
    height: 250,
    overflow: 'hidden',
  },
});
