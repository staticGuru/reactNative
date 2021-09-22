/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import FlatButton from './button';
import Form from './form';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // toggleModal={toggleModal} 
  return (
    <View>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal
        onBackButtonPress={toggleModal }
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        onBackdropPress={toggleModal}>
        <View style={styles.content}>
          <Form toggleModal={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;

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
