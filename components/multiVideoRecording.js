/* eslint-disable prettier/prettier */

import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Video from 'react-native-video';
import FlatButton from './audioButton';
import Camera from './camera';

class MultiVideoRecording extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recording: 'start',
      count: 0,
      dataUri: '',
      post: false,
      seconds: 60,
      timer: '00:00:00',
      videolist: [],
    };
    this.interval;
  }
  componentDidMount() {
    console.log('componentDidUpdate');
    this.setState({seconds: 60});
  }

  startCountdown(seconds) {
    let counter = seconds;

    this.interval = setInterval(() => {
      console.log(counter);
      this.setState({seconds: counter});
      counter--;

      if (counter < 0) {
        clearInterval(this.interval);
        console.log('Ding!');
        this.stopVideo();
      }
    }, 1000);
  }

  passVideo = async () => {
    if (this.camera) {
      console.log('video pausePreview');
      this.setState(prevState => ({
        ...prevState,
        recording: 'Resume',
        count: 1,
      }));

      this.camera.pauseRecording();
    }
  };
  resumeVideo = async () => {
    if (this.camera) {
      this.setState(prevState => ({
        ...prevState,
        recording: 'pause',
        count: 0,
      }));
      console.log('video stopped');

      this.camera.resumeRecording();
    }
  };
  call = () => {
    this.props.navigation.navigate('Post', {url: this.state.dataUri});
  };

  postVideo = async () => {
    if (this.camera) {
      this.setState(prevState => ({
        ...prevState,

        count: 0,
      }));
      this.props.navigation.navigate('MultiVideoRendering', {
        urlList: this.state.videolist,
      });

      this.setState(prevState => ({
        ...prevState,
        recording: 'start',
        dataUri: '',
        count: 0,
      }));
    }
  };
  takePicture = async () => {
    this.setState(prevState => ({...prevState, recording: 'stop', count: 0}));

    this.startCountdown(61);
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.recordAsync(options);
      this.setState(prevState => ({
        dataUri: data.uri,
        videolist: [...prevState.videolist, data.uri],
      }));
    }
  };
  stopVideo = async () => {
    if (this.camera) {
      console.log('video stopped');

      this.setState(prevState => ({
        ...prevState,
        recording: 'start',
        count: 1,
      }));
      clearInterval(this.interval);
      await this.camera.stopRecording();
    }
  };
  HandleVideo = () => {
    this.setState({seconds: 60, count: 0});
  };
  render() {
    return this.state.post === false ? (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          orientation="portrait"
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            position: 'relative',
            justifyContent: 'center',
          }}>
          <Text style={styles.countdown}>{this.state.seconds}</Text>
        </View>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          {this.state.count === 1 ? (
            <TouchableOpacity
              onPress={this.HandleVideo.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                Add +
              </Text>
            </TouchableOpacity>
          ) : null}
          {this.state.count !== 1 ? (
            <TouchableOpacity
              onPress={
                this.state.recording !== 'stop'
                  ? this.takePicture.bind(this)
                  : this.stopVideo.bind(this)
              }
              style={styles.capture}>
              <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                {this.state.recording !== 'stop' ? 'start' : 'stop'}
              </Text>
            </TouchableOpacity>
          ) : null}

          {this.state.count === 1 ? (
            <TouchableOpacity
              onPress={this.postVideo.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                post
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    ) : (
      <Camera uri={this.state.dataUri} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  countdown: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttons1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },

  preview: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  capture: {
    flex: 0,
    backgroundColor: '#f01d71',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MultiVideoRecording;
