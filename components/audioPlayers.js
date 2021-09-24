/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  Button,
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FlatButton from './audioButton';
const screenWidth = Dimensions.get('screen').width;
class AudioPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      thrsholdTime: 59842,
      send: false,
      counter:60,
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(1); // optional. Default is 0.5
  }
  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    const volume = await this.audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    this.audioRecorderPlayer.addPlayBackListener(e => {
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };
  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
  onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log('audioSet', audioSet);
   
    const uri = await this.audioRecorderPlayer.startRecorder(
      undefined,
      audioSet,
    );
    this.setState({send: false});
    this.audioRecorderPlayer.addRecordBackListener(e => {
         console.log('record-back', this.state.counter, parseInt(Math.floor(e.currentPosition)/1000),parseFloat(this.state.recordTime));
       
     
        
     if(parseInt(this.state.counter) ==0){
      console.log(Math.floor(e.currentPosition));
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          0
        ),
        
      });
        this.onStopRecord();
     }else{
      
        this.setState({
          recordSecs: e.currentPosition,
          recordTime: this.audioRecorderPlayer.mmssss(
            this.state.thrsholdTime -Math.floor(e.currentPosition),
          ),
          counter:this.state.counter-1
          //     thrsholdTime:this.thrsholdTime-this.recordTime
        });
       
  
     }

    
    });
    // console.log(`uri: ${uri}`);
  };
  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
    this.setState({dataUri: result, send: true});
    // this.setState({send:true});
  };
  HandleSend = () => {
    console.log('Send');
    this.props.navigation.navigate('Preview', {uri: this.state.dataUri});
  };

  render() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    if (!playWidth) {
      playWidth = 0;
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.titleTxt}>Audio Recorder Player</Text>
        </View>
        <View style={styles.counter}>
          <Text style={styles.txtRecordCounter}>{this.state.counter}</Text>
        </View>

        <View style={styles.recordBtnWrapper}>
          <FlatButton
            style={styles.btn}
            text="Record"
            onPress={this.onStartRecord}
          />

          <FlatButton text="Stop" onPress={this.onStopRecord} />
          {/*   <View style={styles.recordButton}>
              <Button
                style={styles.btn}
                onPress={this.onStartRecord}
                textStyle={styles.txt}
                title="Record"
              />
    </View>*/}

          {/*<Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onPauseRecord}
              textStyle={styles.txt}
              title="Pause"/>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onResumeRecord}
              textStyle={styles.txt}
          title="Resume"/>*/}
          {/*   <View>
              <Button
                style={styles.btn}
                onPress={this.onStopRecord}
                textStyle={styles.txt}
                title="Stop"
              />
         </View>*/}
        </View>
        {this.state.send ? (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <FlatButton text="Send" onPress={this.HandleSend} />
          </View>
        ) : null}

        {/* <View style={styles.viewPlayer}>
          <TouchableOpacity
            style={styles.viewBarWrapper}
            onPress={this.onStatusPress}>
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, {width: playWidth}]} />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtCounter}>
            {this.state.playTime} / {this.state.duration}
          </Text>
          <View style={styles.playBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartPlay}
              textStyle={styles.txt}
              title="Play"/>

            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onPausePlay}
              textStyle={styles.txt}
              title="Pause"/>

            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onResumePlay}
              textStyle={styles.txt}
              title="Resume"/>

            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onStopPlay}
              textStyle={styles.txt}
              title="Stop"/>

          </View>
          </View>*/}
      </SafeAreaView>
    );
  }
}

export default AudioPlayers;
const styles = StyleSheet.create({
  counter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  titleTxt: {
    //   marginLeft:20,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  txtRecordCounter: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    //     alignItems: 'center',
    flexDirection: 'column',
  },
  btn1: {
    marginRight: 20,
  },
  recordBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
