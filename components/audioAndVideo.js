/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import FlatButton from './audioButton';
import AudioPlayers from './audioPlayers';
import AudioRecording from './audioRecording';
import CameraSetup from './cameraSetup';
import TextView from './Text';

const AudioAndVideo = ({navigation}) => {
  const [text, setText] = useState(false);
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(false);
  const HandleText = () => {
    setText(!text);
    audio ? setAudio(false) : null;
    video ? setVideo(false) : null;
  };
  const HandleAudio = () => {
    setAudio(!audio);
    text ? setText(false) : null;
    video ? setVideo(false) : null;
  };
  const HandleVideo = () => {
    setVideo(!video);
    text ? setText(false) : null;
    audio ? setAudio(false) : null;
  };
  console.log(video);
  return !video ? (
    <View sytle={styles.container12}>
      <View style={styles.buttons}>
        <FlatButton text="Text" onPress={HandleText} />
        <FlatButton text="Audio" onPress={HandleAudio} />
        <FlatButton text="Video" onPress={HandleVideo} />
      </View>

      {text && <TextView navigation={navigation} setText={setText} />}
      {audio && <AudioPlayers navigation={navigation} setAudio={setAudio} />}
    </View>
  ) : (
    <CameraSetup
      setText={setText}
      setVideo={setVideo}
      setAudio={setAudio}
      navigation={navigation}
    />
  );
};

export default AudioAndVideo;

const styles = StyleSheet.create({
  container12: {
    flex: 1,

    backgroundColor: 'red',
    position: 'relative',
  },

  content: {
    backgroundColor: 'red',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    backgroundColor: 'red',
  },
});
