import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import React, { useState, useEffect } from 'react';

import { auth, database } from '../firebase';
import { useNavigation } from '@react-navigation/core';

const NuevoObjetivo = () => {
  const [datosObjetivo, setDatosObjetivo] = useState({});

  const navigation = useNavigation();

  const userId = auth.currentUser.uid;

  const guardarHandler = () => {
    const currentDate = new Date();
    const firstDayWeek = currentDate.getDate() - currentDate.getDay() + 1;
    const lastDayOfWeek = firstDayWeek + 6;
    const startOfWeek = new Date(currentDate.setDate(firstDayWeek));
    const endOfWeek = new Date(currentDate.setDate(lastDayOfWeek));

    const nuevoObjetivo = {
      ...datosObjetivo,
      createdAt: currentDate.getTime(),
      startOfWeek: startOfWeek.getTime(),
      endOfWeek: endOfWeek.getTime(),
    };

    database
      .ref(`objetivos/${userId}`)
      .push(JSON.parse(JSON.stringify(nuevoObjetivo)));

    navigation.navigate('Noticias');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de Personas que voy a conocer en la semana:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.personasConocerSemana?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              personasConocerSemana: {
                ...datosObjetivo.personasConocerSemana,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de Personas que voy a contactar para invitar a mis
          presentaciones:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.personasContactar?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              personasContactar: {
                ...datosObjetivo.personasContactar,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de presentaciones que voy a dar en la semana:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadPresentaciones?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadPresentaciones: {
                ...datosObjetivo.cantidadPresentaciones,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de invitados personales que estarán en presentaciones de
          oportunidad:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadInvitadosPersonales?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadInvitadosPersonales: {
                ...datosObjetivo.cantidadInvitadosPersonales,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de invitados que voy a llevar a mis eventos:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadInvitadosEventos?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadInvitadosEventos: {
                ...datosObjetivo.cantidadInvitadosEventos,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Horas que voy a dedicar a la lectura:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.horasLectura?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              horasLectura: {
                ...datosObjetivo.horasLectura,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de productos que voy a vender:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadProductosVender?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadProductosVender: {
                ...datosObjetivo.cantidadProductosVender,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de personas que voy a patrocinar:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadPersonasPatrocinadas?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadPersonasPatrocinadas: {
                ...datosObjetivo.cantidadPersonasPatrocinadas,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de posteos que haré en mis redes sociales:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograr..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadPosteos?.esperado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadPosteos: {
                ...datosObjetivo.cantidadPosteos,
                esperado: text,
              },
            })
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={guardarHandler}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NuevoObjetivo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  textInputContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '70%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
