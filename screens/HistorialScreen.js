import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Platform,
  Dimensions
} from 'react-native';

import { ProgressCircle } from 'react-native-svg-charts';

import React, { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { getAcumuladosObjetivos } from '../api/ObjetivosApi.js';
import {
  GRAPH_LABEL,
  DROPDOWN_ITEMS,
  PERIODO_DROPDOWN_ITEMS,
} from '../constants/historial_constants.js';
import { auth } from '../firebase';
import DropDownPicker from 'react-native-dropdown-picker';

const META_DEFAULT = 'personasConocerSemana';
const PERIODO_DEFAULT = 30;

const HistorialScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [objetivosAcumulados, setObjetivosAcumulados] = useState({});

  const [openMetaDropdown, setOpenMetaDropdown] = useState(false);
  const [metaSeleccionada, setMetaSeleccionada] = useState(META_DEFAULT);

  const [openPeriodoDropdown, setOpenPeriodoDropdown] = useState(false);
  const [periodoSeleccionado, setPeriodoSeleccionado] =
    useState(PERIODO_DEFAULT);

  const metaActual =
    objetivosAcumulados && objetivosAcumulados[metaSeleccionada];

  const userId = auth.currentUser.uid;

  useFocusEffect(
    useCallback(() => {
      const getObjetivos = async () => {
        setIsLoading(true);
        const data = await getAcumuladosObjetivos(periodoSeleccionado, userId);
        setObjetivosAcumulados(data);
        setIsLoading(false);
      };

      getObjetivos();
    }, [])
  );

  const periodoSelectedHandler = async (itemSelected) => {
    setIsLoading(true);
    const data = await getAcumuladosObjetivos(itemSelected.value);
    setObjetivosAcumulados(data);
    setIsLoading(false);
  };

  const onPeriodoOpenHandler = () => {
    setOpenMetaDropdown(false);
  };

  const onMetaOpenHandler = () => {
    setOpenPeriodoDropdown(false);
  };

  const esperado = metaActual?.esperado || 0;
  const logrado = metaActual?.logrado || 0;
  const porcentajeLogrado = metaActual
    ? parseFloat(
        ((metaActual?.logrado || 0) / (metaActual?.esperado || 1)) * 100
      ).toFixed(0)
    : 0;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.filtersContainer,
          Platform.OS === 'android' &&
            (openMetaDropdown || openPeriodoDropdown) &&
            styles.androidContainer,
        ]}
      >
        <DropDownPicker
          open={openMetaDropdown}
          value={metaSeleccionada}
          items={DROPDOWN_ITEMS}
          setOpen={setOpenMetaDropdown}
          setValue={setMetaSeleccionada}
          placeholder="Selecciona meta..."
          zIndex={2000}
          zIndexInverse={1000}
          style={{
            marginBottom: 20,
            ...styles.dropdownStyle,
          }}
          onOpen={onMetaOpenHandler}
        />
        <DropDownPicker
          open={openPeriodoDropdown}
          value={periodoSeleccionado}
          items={PERIODO_DROPDOWN_ITEMS}
          setOpen={setOpenPeriodoDropdown}
          setValue={setPeriodoSeleccionado}
          placeholder="Selecciona un periodo..."
          zIndex={1000}
          zIndexInverse={2000}
          onSelectItem={periodoSelectedHandler}
          onOpen={onPeriodoOpenHandler}
          style={styles.dropdownStyle}
        />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#95969B" />
        </View>
      )}
      {!isLoading && !objetivosAcumulados && (
        <View style={styles.loadingContainer}>
          <Text style={styles.emptyMessageText}>
            No hay objetivos registrados
          </Text>
        </View>
      )}
      {!isLoading && objetivosAcumulados && (
        <>
          <View style={styles.chartContainer}>
            <Text style={styles.graphTitle}>
              {GRAPH_LABEL[metaSeleccionada]}
            </Text>
            <ProgressCircle
              style={{
                height: 200,
                width: Dimensions.get('window').width,
                marginBottom: 40,
              }}
              progress={(porcentajeLogrado || 0) / 100}
              backgroundColor={'gainsboro'}
              progressColor={'dodgerblue'}
              strokeWidth={15}
            />
            <View style={styles.detailsContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.detailLabel}>Meta:</Text>
                <Text style={styles.resultLabel}>{esperado}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.detailLabel}>Logrado:</Text>
                <Text style={styles.resultLabel}>{logrado}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.detailLabel}>% Completado:</Text>
                <Text style={styles.resultLabel}>{`${
                  porcentajeLogrado || 0
                }%`}</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default HistorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filtersContainer: {
    padding: 20,
    width: '100%',
    zIndex: 999,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : '10%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  graphTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 20,
    marginBottom: 30,
  },
  androidContainer: {
    minHeight: 500,
    marginBottom: -340,
  },
  emptyMessageText: {
    color: '#95969B',
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  resultLabel: {
    fontSize: 16,
  },
  dropdownStyle: {
    borderColor: 'lightgrey',
  },
});
