import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { auth, firebase } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import {
  createNewObjetivo,
  getMostRecentObjetivoByUserId,
  updateObjetivoById,
} from '../api/ObjetivosApi.js';
import { startAndEndOfWeek } from '../utils/dates_utils.js';

import FiltrarMetasModal from '../components/FiltrarMetasModal';

const INITIAL_FILTERS = {
  cantidadInvitadosEventos: true,
  cantidadInvitadosPersonales: true,
  cantidadPersonasPatrocinadas: true,
  cantidadPosteos: true,
  cantidadPresentaciones: true,
  cantidadProductosVender: true,
  horasLectura: true,
  personasConocerSemana: true,
  personasContactar: true,
};

const NuevoObjetivo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [datosObjetivo, setDatosObjetivo] = useState({});
  const [isUpated, setIsUpdated] = useState(false);
  const [showModals, setShowModals] = useState(INITIAL_FILTERS);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const navigation = useNavigation();

  const userId = auth.currentUser.uid;

  useFocusEffect(
    useCallback(() => {
      const getLatestObjetivo = async () => {
        setIsLoading(true);
        const objetivo = await getMostRecentObjetivoByUserId(userId);
        setIsLoading(false);
        if (objetivo) {
          setDatosObjetivo(objetivo);
          setShowModals(objetivo.filters ? objetivo.filters : INITIAL_FILTERS);
          setIsUpdated(true);
          navigation.setOptions({ title: 'Actualizar Objetivo' });
        } else {
          setDatosObjetivo({});
          setIsUpdated(false);
        }
      };

      getLatestObjetivo();
    }, [])
  );

  const guardarHandler = () => {
    if (isUpated) {
      updateObjetivoById(datosObjetivo.id, datosObjetivo);
      navigation.navigate('Noticias');
      return;
    }

    const { start: startOfWeek, end: endOfWeek } = startAndEndOfWeek(
      new Date()
    );

    const nuevoObjetivo = {
      ...datosObjetivo,
      createdAt: new Date(),
      startOfWeek: startOfWeek,
      endOfWeek: endOfWeek,
      userId,
      filters: showModals,
    };

    createNewObjetivo(nuevoObjetivo);

    navigation.navigate('Noticias');
  };

  const onFiltrarPressHandler = () => {
    setIsFilterModalOpen(true);
  };

  const onFilterModalClose = (filters) => {
    const filteredObjetivos = { ...datosObjetivo };

    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        filteredObjetivos[key] = {};
      }
    });
    setDatosObjetivo(filteredObjetivos);
    setShowModals(filters);
    setIsFilterModalOpen(false);
  };

  return (
    <>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#95969B" />
        </View>
      )}
      {!isLoading && (
        <ScrollView style={styles.container}>
          <FiltrarMetasModal
            onModalClose={onFilterModalClose}
            isOpen={isFilterModalOpen}
            metasFilters={showModals}
          />
          <View style={styles.filterButtonContainer}>
            <TouchableOpacity
              style={styles.fitlerButton}
              onPress={onFiltrarPressHandler}
            >
              <Text style={styles.filterText}>Filtrar Metas</Text>
            </TouchableOpacity>
          </View>
          {showModals.personasConocerSemana && (
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
          )}
          {showModals.personasContactar && (
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
          )}
          {showModals.cantidadPresentaciones && (
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
          )}
          {showModals.cantidadInvitadosPersonales && (
            <View style={styles.textInputContainer}>
              <Text style={styles.inputLabel}>
                Cantidad de invitados personales que estarán en presentaciones
                de oportunidad:
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
          )}
          {showModals.cantidadInvitadosEventos && (
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
          )}
          {showModals.horasLectura && (
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
          )}
          {showModals.cantidadProductosVender && (
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
          )}
          {showModals.cantidadPersonasPatrocinadas && (
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
          )}
          {showModals.cantidadPosteos && (
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
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={guardarHandler}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  filterButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  fitlerButton: {
    backgroundColor: 'white',
    width: '70%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  filterText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
