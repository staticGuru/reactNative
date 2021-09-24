/* eslint-disable prettier/prettier */
import React, {useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Video from 'react-native-video';

const Post = ({route}) => {
  // console.log(route.params.url, 'rui');
  const cameraRef = useRef(null);
  function call() {
    return cameraRef.presentFullscreenPlayer();
  }
  return route.params.url !== 'u' ? (
    <Video
      ref={cameraRef}
      source={{uri: route.params.url, mainVer: 1, patchVer: 0}} // Can be a URL or a local file.
      controls={true}
      resizeMode="cover"
      // Store reference
      // Callback when remote video is buffering
      // Callback when video cannot be loaded
      style={styles.backgroundVideo}
    />
  ) : null;
};

const styles = StyleSheet.create({
  backgroundVideo: {
    //     flex: 1,

    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
});
export default Post;
