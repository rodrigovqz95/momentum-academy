import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { VictoryBar, VictoryChart, VictoryGroup } from 'victory-native';

import { Divider } from 'react-native-elements';

import React, { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { getAcumuladosObjetivos } from '../api/ObjetivosApi.js';
import {
  GRAPH_LABEL,
  DROPDOWN_ITEMS,
  PERIODO_DROPDOWN_ITEMS,
} from '../constants/historial_constants.js';

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

  const metaActual = objetivosAcumulados[metaSeleccionada];

  useFocusEffect(
    useCallback(() => {
      const getObjetivos = async () => {
        setIsLoading(true);
        const data = await getAcumuladosObjetivos(periodoSeleccionado);
        setObjetivosAcumulados(data);
        setIsLoading(false);
      };

      getObjetivos();
    }, [])
  );

  const periodoSelectedHandler = async (itemSelected) => {
    setIsLoading(isLoading);
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

  const esperados = [
    { x: GRAPH_LABEL[metaSeleccionada], y: metaActual?.esperado || 0 },
  ];
  const logrados = [
    { x: GRAPH_LABEL[metaSeleccionada], y: metaActual?.logrado || 0 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
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
        />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!isLoading && (
        <View style={styles.chartContainer}>
          <VictoryChart>
            <VictoryGroup offset={30} colorScale={'qualitative'}>
              <VictoryBar
                barWidth={30}
                data={esperados}
                categories={{ x: [GRAPH_LABEL[metaSeleccionada]] }}
                labels={({ datum }) => `${datum.y}`}
              />
              <VictoryBar
                data={logrados}
                barWidth={30}
                categories={{ x: [GRAPH_LABEL[metaSeleccionada]] }}
                labels={({ datum }) => `${datum.y}`}
              />
            </VictoryGroup>
          </VictoryChart>
        </View>
      )}
    </View>
  );
};

export default HistorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    padding: 20,
    width: '100%',
    zIndex: 100,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
