/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import OrientationForm from './orientationForm';
import {TextField} from 'react-native-material-textfield';

function OrientationModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [n, setN] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // toggleModal={toggleModal}
  return (
    <View>
      <Button title="Show OrientationModal" onPress={toggleModal} />
    {/*  <TextField
        label="Phone number"
        value={n}
        onChangeText={phone => setN({phone})}
    />*/}

      <Modal
        onBackButtonPress={toggleModal}
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        onBackdropPress={toggleModal}>
        <View style={styles.content}>
          <OrientationForm toggleModal={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default OrientationModal;

const styles = StyleSheet.create({
  content: {
    // width: 300,
    alignItems: 'center',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 20,
    paddingTop: 20,
   
    
  },
  hide: {
    width: 200,
    height: 200,
  },
});
