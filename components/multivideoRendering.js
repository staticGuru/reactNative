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
  useEffect(() => {
    console.log(typeof parseFloat(progress1), 'progress1');

    setProgress(0);
    // setDuration(0);
  }, [state]);

  useEffect(() => {
    console.log(duration, 'druation');
  }, [duration]);

  // if (state == 0) {
  // console.log(duration, parseFloat(progress1), 'duration', state);
  if (parseFloat(progress1) <= duration) {
    var sub = (duration - parseFloat(progress1)) / duration;
    // console.log(
    //   parseFloat(
    //     parseFloat(1 - (duration - parseFloat(progress1)) / duration).toFixed(
    //       3,
    //     ),
    //   ),
    //   'sub------------------',
    //   typeof parseFloat(
    //     parseFloat(1 - (duration - parseFloat(progress1)) / duration).toFixed(
    //       3,
    //     ),
    //   ),
    // );
  }
  // }

  const MultiVideoElement = ({item, index}) => {
    // console.log(index, '-', item, 'urlList');
    //   const [item1, setItem] = useState('');

    //   setItem(item)
    // console.log(index,"index")   console.log(e.seekableDuration,"total")

    return (
      <Video
        source={{uri: item}} // Can be a URL or a local file.
        resizeMode="cover"
        controls={false}
        style={styles.backgroundVideo}
        onProgress={e =>
          state == index
            ? (setDuration(e.seekableDuration),
              setProgress(parseFloat(e.currentTime).toFixed(3)),
              console.log('duration'))
            : null
        }
        onEnd={e => console.log('end of the video')}
        // onLoadStart={e=>console.log("start of the video",e)}
        // onLoad={e => (state == index ? setDuration(e.duration) : console.log("duration not in index"))}
      />
    );
  };

  return (
    <View style={styles.container123}>
      <View style={{flexDirection: 'row', borderWidth: 1, padding: 5}}>
        {route.params.urlList.map((e, index) => (
          <View
            key={index}
            style={{
              width: parseInt(WIDTH) - 15,
              marginLeft: 5,
              marginRight: 5,
            }}>
            <ProgressBar
              indeterminate={false}
              progress={
                state == index
                  ? 1 - (duration - parseFloat(progress1)) / duration
                    ? parseFloat(
                        parseFloat(
                          1 - (duration - parseFloat(progress1)) / duration,
                        ).toFixed(3),
                      ) >= 0.9
                      ? 1
                      : parseFloat(
                          parseFloat(
                            1 - (duration - parseFloat(progress1)) / duration,
                          ).toFixed(3),
                        )
                    : 0
                  : state > index
                  ? 1
                  : 0
              }
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
        onSnapToItem={index => setState(index)}
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
