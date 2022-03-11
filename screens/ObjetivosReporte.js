import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import React, { useState, useEffect } from 'react';

import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import {
  getObjetivosByObjetivoId,
  updateObjetivoById,
} from '../api/ObjetivosApi';

const ObjetivosReporte = ({ route }) => {
  const [datosObjetivo, setDatosObjetivo] = useState({});
  const navigation = useNavigation();
  const { objetivoId } = route.params;
  const usuario = auth.currentUser;

  useEffect(() => {
    const getObjetivo = async () => {
      const objetivo = await getObjetivosByObjetivoId(objetivoId);
      setDatosObjetivo(objetivo);
    };
    getObjetivo();
  }, [objetivoId]);

  const guardarHandler = () => {
    updateObjetivoById(objetivoId, datosObjetivo);
    navigation.navigate('Noticias');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de Personas que conocí en la semana:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.personasConocerSemana?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              personasConocerSemana: {
                ...datosObjetivo.personasConocerSemana,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada: {datosObjetivo.personasConocerSemana?.esperado}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de Personas que contacté para invitar a mis presentaciones:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.personasContactar?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              personasContactar: {
                ...datosObjetivo.personasContactar,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada: {datosObjetivo.personasContactar?.esperado}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de presentaciones quedí en la semana:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadPresentaciones?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadPresentaciones: {
                ...datosObjetivo.cantidadPresentaciones,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada: {datosObjetivo.cantidadPresentaciones?.esperado}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de invitados personales que estuvieron en presentaciones de
          oportunidad:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadInvitadosPersonales?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadInvitadosPersonales: {
                ...datosObjetivo.cantidadInvitadosPersonales,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada:{' '}
          {datosObjetivo.cantidadInvitadosPersonales?.esperado}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de invitados que llevé a mis eventos:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadInvitadosEventos?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadInvitadosEventos: {
                ...datosObjetivo.cantidadInvitadosEventos,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada: {datosObjetivo.cantidadInvitadosEventos?.esperado}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>Horas que dedique a la lectura:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.horasLectura?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              horasLectura: {
                ...datosObjetivo.horasLectura,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada: {datosObjetivo.horasLectura?.esperado}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>Cantidad de productos vendí:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadProductosVender?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadProductosVender: {
                ...datosObjetivo.cantidadProductosVender,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada: {datosObjetivo.cantidadProductosVender?.esperado}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>Cantidad de personas patrocine:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadPersonasPatrocinadas?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadPersonasPatrocinadas: {
                ...datosObjetivo.cantidadPersonasPatrocinadas,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada:{' '}
          {datosObjetivo.cantidadPersonasPatrocinadas?.esperado}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputLabel}>
          Cantidad de posteos que realice en mis redes sociales:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad a lograda..."
          keyboardType="numeric"
          value={datosObjetivo.cantidadPosteos?.logrado}
          onChangeText={(text) =>
            setDatosObjetivo({
              ...datosObjetivo,
              cantidadPosteos: {
                ...datosObjetivo.cantidadPosteos,
                logrado: text,
              },
            })
          }
        />
        <Text style={styles.inputDisclaimer}>
          Cantidad planeada: {datosObjetivo.cantidadPosteos?.esperado}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={guardarHandler}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ObjetivosReporte;

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
  inputDisclaimer: {
    fontSize: 12,
    color: 'grey',
    marginTop: 10,
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
