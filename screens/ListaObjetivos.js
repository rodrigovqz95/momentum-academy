import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { auth, firebase } from '../firebase';
import { getObjetivosByUserId, deleteObjetivo } from '../api/ObjetivosApi';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { Divider } from 'react-native-elements';
import { getDateFromFirestoreTimestamp } from '../utils/dates_utils.js';

const ListaObjetivos = () => {
  const [objetivos, setObjetivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = auth.currentUser;
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const getObjetivos = async () => {
        setIsLoading(true);
        const objetivosUsuario = await getObjetivosByUserId(user.uid);
        setObjetivos(objetivosUsuario);
        setIsLoading(false);
      };

      getObjetivos();
    }, [user.uid])
  );

  const editHandler = (objetivo) => {
    navigation.navigate('EditObjetivo', {
      objetivoId: objetivo.id,
    });
  };

  const deleteHandler = async (objetivo) => {
    setIsLoading(true);
    const remainingObjetivos = await deleteObjetivo(objetivo);
    setObjetivos(remainingObjetivos);
    setIsLoading(false);
  };

  const objetivosItems = objetivos.map((objetivo) => {
    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    const startOfWeek = getDateFromFirestoreTimestamp(
      objetivo.startOfWeek
    ).toLocaleDateString('es-US', formatOptions);

    const endOfWeek = getDateFromFirestoreTimestamp(
      objetivo.endOfWeek
    ).toLocaleDateString('es-US', formatOptions);

    return (
      <TouchableOpacity key={objetivo.id} onPress={() => editHandler(objetivo)}>
        <View style={styles.itemContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.itemTitle}>Objetivo:</Text>
            <Text>
              {startOfWeek} - {endOfWeek}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <AntDesign
              name="delete"
              color="red"
              size={20}
              onPress={() => deleteHandler(objetivo)}
            />
          </View>
        </View>
        <Divider style={{ setStatusBarBackgroundColor: 'black' }} />
      </TouchableOpacity>
    );
  });

  return (
    <>
      {!isLoading && objetivos.length > 0 && (
        <ScrollView style={styles.container}>{objetivosItems}</ScrollView>
      )}
      {!isLoading && objetivos.length == 0 && (
        <View style={styles.loadingContainer}>
          <Text style={styles.emptyMessageText}>
            No hay objetivos registrados
          </Text>
        </View>
      )}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#95969B" />
        </View>
      )}
    </>
  );
};

export default ListaObjetivos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  detailsContainer: {
    flexDirection: 'column',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  emptyMessageText: {
    color: '#95969B',
  },
});
