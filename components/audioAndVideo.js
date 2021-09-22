/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FlatButton from './audioButton';
import AudioRecording from './audioRecording';
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
    text ? setText(false): null;
    video ? setVideo(false) : null;
  };
  return (
    <View sytle={styles.container}>
      <View style={styles.buttons}>
        <FlatButton text="Text" onPress={HandleText} />
        <FlatButton text="Audio" onPress={HandleAudio} />
        <FlatButton text="Video" />
      </View>
      {text && <TextView navigation={navigation} setText={setText} />}
      {audio && <AudioRecording navigation={navigation} setAudio={setAudio} />}
    </View>
  );
};

export default AudioAndVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //     alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'lightblue',
  },
  text: {
    backgroundColor: 'red',
  },
});
