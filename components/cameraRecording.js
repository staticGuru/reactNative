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
import Camera from './camera';
import Post from './Post';

class CameraRecording extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recording: 'start',
      count: 0,
      dataUri: '',
      post: false,
    };
    
  }
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
          // pauseAfterCapture="true"
          // flashMode=
          // androidCameraPermissionOptions={{
          //   title: 'Permission to use camera',
          //   message: 'We need your permission to use your camera',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
          // androidRecordAudioPermissionOptions={{
          //   title: 'Permission to use audio recording',
          //   message: 'We need your permission to use your audio',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
          // onGoogleVisionBarcodesDetected={({barcodes}) => {
          //   console.log(barcodes);
          // }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={
              this.state.recording === 'start'
                ? this.takePicture.bind(this)
                : this.state.recording === 'pause'
                ? this.passVideo.bind(this)
                : this.resumeVideo.bind(this)
            }
            style={styles.capture}>
            <Text style={{fontSize: 14}}>
              {this.state.recording === 'start'
                ? 'start'
                : this.state.recording === 'pause'
                ? 'Pause'
                : 'Resume'}
            </Text>
          </TouchableOpacity>

       
          {this.state.count === 1 ? (
            <TouchableOpacity
              onPress={this.postVideo.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> post </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    ) : (
   
      <Camera uri={this.state.dataUri} />
    );
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
     recording:'pause',
        count: 0,
      }));
      console.log('video stopped');
   
      this.camera.resumeRecording();
    }
  };
  call=() => {
    this.props.navigation.navigate('Post',{url:this.state.dataUri})
  }

  postVideo = async () => {
    if (this.camera) {
        this.setState(prevState => ({
        ...prevState,
     
        count: 0,
      }));
      await this.camera.stopRecording();
      this.setState(prevState => ({...prevState, recording: 'start',dataUri:'',count:0}));

      // this.call();
   
      // this.setState(prevState => ({...prevState, post: true}));
// this.props.navigation.navigate('Post',{url:this.state.dataUri})

    }
  };
  takePicture = async () => {
    // this.setState({recording:'pause'})
    this.setState(prevState => ({...prevState, recording: 'pause'}));
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.recordAsync(options);
      this.props.navigation.navigate('Post',{url:data.uri})
      this.setState(prevState => ({...prevState, dataUri: data.uri}));
    }
  };
  stopVideo = async () => {
    if (this.camera) {
      console.log('video stopped');
      this.camera.stopRecording();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraRecording;

// import React, {useRef} from 'react';
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {RNCamera} from 'react-native-camera';
// const CameraRecording = () => {
//   const useCamera = useRef(null);
//   const TakePicture = async () => {
//     try {
//       // const options = { quality: 0.5, base64: true };
//       const data = await useCamera.recordAsync();
//       console.log('Path to image: ' + data.uri);
//     } catch (err) {
//       console.log('err: ', err);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <RNCamera ref={useCamera} style={styles.preview}>
//         <View style={styles.captureContainer}>
//           <TouchableOpacity style={styles.capture} onPress={TakePicture}>
//             <Text style={styles.iconCamera}>camera</Text>
//             <Text>Take Photo</Text>
//           </TouchableOpacity>
//         </View>
//       </RNCamera>

//      {/* <View style={styles.space} />*/}
//     </View>
//   );
// };

// export default CameraRecording;

// const styles = StyleSheet.create({});
