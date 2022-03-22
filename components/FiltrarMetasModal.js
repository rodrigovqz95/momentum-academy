import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { METAS_LABELS } from '../constants/historial_constants';

const FiltrarMetasModal = ({ isOpen, metasFilters, onModalClose }) => {
  const [filters, setFilters] = useState(metasFilters);
  const onCloseHandler = () => {
    onModalClose(filters);
  };

  const onOverlayClick = () => {
    onModalClose(filters);
  };

  const filtersElements = Object.keys(metasFilters).map((key, index) => {
    return (
      <View style={styles.filterContainer} key={index}>
        <View style={styles.labelContainer}>
          <Text>{METAS_LABELS[key]}</Text>
        </View>
        <View>
          <Switch
            trackColor={{ false: '#767577', true: '#16b53e' }}
            thumbColor={'white'}
            value={filters[key]}
            onValueChange={() => {
              filters[key] = !filters[key];
              setFilters({
                ...filters,
              });
            }}
          />
        </View>
      </View>
    );
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onCloseHandler}
    >
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={onOverlayClick}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Selecciona las metas a crear:</Text>
          <ScrollView style={styles.scrollView}>{filtersElements}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FiltrarMetasModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    height: '50%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  labelContainer: {
    width: '70%',
  },
});
