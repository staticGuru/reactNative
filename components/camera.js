/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

const Camera = props => {
  // console.log(props.route.params.uri,"rui")

  return (
    <View style={styles.container2}>
      {props.uri ? (
        <Video
          source={{uri: props.uri}}
          controls={true}
          style={styles.backgroundVideo}
        />
      ) : (
        <Text>no footage</Text>
      )}
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container2: {
    flex: 1,
    width: 'auto',
    height: 'auto',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
