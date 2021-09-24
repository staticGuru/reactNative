/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import Video from 'react-native-video';
import CarouselSlider from 'react-native-snap-carousel';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {VideoProgress} from 'react-video-progress';

const MultiVideoRendering = ({route}) => {
  //   console.log(route.params.urlList);
  const [progress1, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [state, setState] = useState(0);
  var WIDTH = Dimensions.get('screen').width / route.params.urlList.length;
  //   useEffect(() => {
  //   console.log(state,"state")

  //    },[state])
  console.log(duration, 'duration', state);
  const MultiVideoElement = ({item, index}) => {
    console.log(index, 'urlList');
    //   const [item1, setItem] = useState('');

    //   setItem(item)
    //   console.log(item1)

    return (
      <Video
        source={{uri: item}} // Can be a URL or a local file.
        resizeMode="cover"
        controls={true}
        style={styles.backgroundVideo}
        // onProgress={e =>
        //   state == index
        //     ? setProgress(parseFloat(e.currentTime).toFixed(3))
        //     : null
        // } 

     //    state == index
     //    ? parseFloat((parseFloat(progress1 / 100) * 1.6).toFixed(3))
     //    : state > index
     //    ? 1
     //    : 0

        // onLoad={e => (state == index ? setDuration(e.duration) : null)}
      />
    );
  };

  return (
    <View style={styles.container123}>
      <View style={{flexDirection: 'row'}}>
        {route.params.urlList.map((e, index) => (
          <View
            key={index}
            style={{
              width: parseInt(WIDTH),
            }}>
            {console.log(e)}
            <ProgressBar
              indeterminate={false}
              progress={0}
              styleAttr="Horizontal"
              color="red"
              animating={true}
            />
          </View>
        ))}
      </View>
      <CarouselSlider
        data={route.params.urlList}
        renderItem={MultiVideoElement}
        sliderWidth={400}
        itemWidth={400}
        loop={false}
     //    onSnapToItem={index => setState(index)}
     //    inactiveSlideOpacity={0.7}
     //    inactiveSlideShift={0}
     //    inactiveSlideScale={1}
        enableSnap={true}
     //    activeSlideAlignment="start"
      />
    </View>
  );
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
  container123: {
    flex: 1,
    //    flexDirection: 'row',
    backgroundColor: '#E1E8EB',
  },
});
export default MultiVideoRendering;
