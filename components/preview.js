/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Camera from './camera';

const Preview = ({navigation, route}) => {
  console.log(route.params.uri, 'reportedText');
  return (
    <View style={styles.container}>
      {route.params.reportedText ? (
        <Text style={styles.text}>{route.params.reportedText}</Text>
      ) : null}
      {route.params.uri ? (
        <Camera uri={route.params.uri}/>
      ) : null}
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  container: {flex: 1, margin: 10},
  text: {fontSize: 18},
});
