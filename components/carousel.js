/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CarouselSlider from 'react-native-snap-carousel';
import FlatButton from './button';

const Carousel = ({navigation}) => {
  const CarouselRef = useRef(null);
  const [state, setState] = useState(1);
  const fullHeight = Dimensions.get('window').height;

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProductList(json));
  }, []);
  const HandleDetailsPage=(id,title)=>{
    // console.log(id,"id")
    navigation.navigate('ProductDetail', {
      uid: id,
      title:title,
    });

  }
  const RenderItem = ({item, index}) => {
  //  {index ===1? console.log("data--->",item):null}
    return (
      <View style={[styles.slide, {height: 185}]}>
        <View style={styles.leftContent}>
          <View style={styles.leftIcon}>
            <Image
              source={{uri:item.image}}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.heading}>{item.title}</Text>
            <Image
              source={require('../assets/quality.png')}
              style={{width: 20, height: 20, marginTop: 6}}
            />
          </View>
          <Text numberOfLines={1} style={styles.subTitle}>{item.category}</Text>
          <Text style={styles.title}>
            {item.rating.rate} votes {'    '} ${item.price} price
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.profileButton} onPress={(e)=>HandleDetailsPage(item.id,item.title)}>
              <Text style={styles.profileText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileText}>Ask a question</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  // console.log('state', state);
  
  return (
    <View style={styles.container}>
      <CarouselSlider
        ref={CarouselRef}
        data={productList}
        renderItem={RenderItem}
        sliderWidth={400}
        itemWidth={370}
        onSnapToItem={index => setState({index})}
        loop={true}
        inactiveSlideOpacity={0.7}
        inactiveSlideShift={0}
        inactiveSlideScale={1}
        enableSnap={true}
        activeSlideAlignment="start"
      />
      <View style={[styles.nav, {marginTop: 80}]}>
        <TouchableOpacity
          style={styles.navPreview}
          onPress={() => CarouselRef.current.snapToPrev()}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/left-arrow.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navNext}
          onPress={() => CarouselRef.current.snapToNext()}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/right-arrow.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //    flexDirection: 'row',
    backgroundColor: '#E1E8EB',
  },
  profileText: {
    color: 'white',
    fontWeight: 'bold',
    // textTransform:'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
  profileButton: {
    borderColor: '#3EDBF0',
    borderWidth: 2,
    //   alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    backgroundColor: '#3EDBF0',
    // // width: 200,
    // borderRadius:8,
    // paddingVertical:10,
    // paddingHorizontal:10,
    // backgroundColor:'#f01d71',
  },
  title: {
    fontSize: 16,
    opacity: 0.9,
    color: '#3C8DAD',
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    //   marginBottom:2,
  },
  nav: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //   marginTop:100,
  },
  slide: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 360,
    paddingLeft: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    borderWidth: 0.4,
    borderColor: 'black',
    borderRadius: 20,
    overflow: 'hidden',

    //     justifyContent: 'center',
    //     alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  leftIcon: {
    width: 40,
    height: 40,
    // borderWidth: 2,
    // borderColor: 'gray',
    borderRadius: 25,
    // overflow: 'hidden',
    top: 3,
  },
  rightContent: {
    flex: 6,
    flexDirection: 'column',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'space-around',
    paddingRight: 10,
  },
  navPreview: {
    position: 'relative',
    justifyContent: 'center',
    left: 0,
    marginRight: 330,
  },
  navNext: {
    position: 'relative',
    justifyContent: 'center',
    right: 0,
  },
});

export default Carousel;
