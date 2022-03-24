import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';

const ChangePasswordScreen = () => {
  const [oldpassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    const userCredentials = await auth.signInWithEmailAndPassword(
      auth.currentUser?.email,
      oldpassword
    );
    const user = userCredentials.user;

    if (password !== confirmPassword) {
      alert(`Password must be the same`);
      return;
    }

    try {
      user.updatePassword(password);
      alert("Cambio De Contraseña Fue Exitoso")
      navigation.replace('Account');      
    } catch (error) {
      alert(error.message);
    }
  };

  const loginHandler = async () => {
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Contraseña"
          value={oldpassword}
          onChangeText={(text) => setOldPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Nueva Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirmar Nueva Contraseña"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={loginHandler} style={styles.button}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

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
    fontSize: 16,
    textAlign: 'center',
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
