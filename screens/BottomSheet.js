/* eslint-disable prettier/prettier */
import React, {useRef} from 'react';
import {View, Button, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CameraRecording from '../components/cameraRecording';
import ModalTester from '../components/modelTester';
import OrientationModal from '../components/orientationModal';
import SocialIcons from '../components/SocialIcons';

export default function Example() {
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      />
      <ModalTester />
      <OrientationModal />
        <CameraRecording />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        animationType="slide"
        minClosingHeight={100}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        onClose={() => console.log('is closed')}
        onOpen={() => console.log('is opened')}
        keyboardAvoidingViewEnabled={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'gray',
          },
          draggableIcon: {
            backgroundColor: 'red',
          },
        }}>
        <SocialIcons />
      </RBSheet>
    </View>
  );
}
