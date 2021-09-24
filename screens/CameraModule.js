/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CameraRecording from '../components/cameraRecording';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Post from '../components/Post';
import Camera from '../components/camera';
import Carousel from '../components/carousel';
import ProductDetailScreen from '../components/ProductDetailScreen';
import TextView from '../components/textView';
import AudioAndVideo from '../components/audioAndVideo';
import Preview from '../components/preview';
import MultiVideoRecording from '../components/multiVideoRecording';
import MultiVideoRendering from '../components/multivideoRendering';

const CameraModule = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MultiVideoRecording">
        <Stack.Screen name="Camera" component={CameraRecording} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="MultiVideoRendering" component={MultiVideoRendering} />
        <Stack.Screen name="Carousel" component={Carousel} />
        <Stack.Screen name="TextView" component={TextView} />
        <Stack.Screen name="Audio" component={AudioAndVideo} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen
          name="MultiVideoRecording"
          component={MultiVideoRecording}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({route}) => ({title: route.params.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CameraModule;

const styles = StyleSheet.create({});
