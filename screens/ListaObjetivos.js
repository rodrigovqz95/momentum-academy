import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { auth, database } from '../firebase';
import { getObjetivosByUserId } from '../api/ObjetivosApi';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';

const ListaObjetivos = () => {
  const [objetivos, setObjetivos] = useState([]);
  const user = auth.currentUser;
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const getObjetivos = async () => {
        const objetivosUsuario = await getObjetivosByUserId(user.uid);
        setObjetivos(objetivosUsuario);
      };

      getObjetivos();
    }, [user.uid])
  );

  const editHandler = (objetivo) => {
    navigation.navigate('EditObjetivo', {
      objetivoId: objetivo.id,
    });
  };

  const objetivosItems = objetivos.map((objetivo, index) => {
    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const startOfWeek = new Date(objetivo.startOfWeek).toLocaleDateString(
      'es-US',
      formatOptions
    );
    const endOfWeek = new Date(objetivo.endOfWeek).toLocaleDateString(
      'es-US',
      formatOptions
    );

    return (
      <View style={styles.itemContainer} key={index}>
        <View style={styles.detailsContainer}>
          <Text style={styles.itemTitle}>Objetivo:</Text>
          <Text>
            {startOfWeek} - {endOfWeek}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign
            name="edit"
            color="#0782F9"
            size={20}
            onPress={() => editHandler(objetivo)}
          />
        </View>
      </View>
    );
  });

  return <ScrollView style={styles.container}>{objetivosItems}</ScrollView>;
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
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
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
});
