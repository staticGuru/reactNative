/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ProductDetailScreen = ({navigation, route}) => {
  const [detail, setDetail] = useState();
  console.log(route.params.uid);

  useEffect(() => {
    if (route.params.uid) {
      fetch(`https://fakestoreapi.com/products/${route.params.uid}`)
        .then(res => res.json())
        .then(json => setDetail(json));
    }
  }, [route.params.uid]);
  //   console.log(detail, 'details');
  return (
    <View style={styles.topContainer}>
      {detail ? (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.description}>{detail.description}</Text>
              <Text style={styles.price}> Flash sale on ${detail.price}</Text>
              <Text style={styles.description}>
                Rating: {detail.rating.rate}
              </Text>
              <Text style={styles.description}>
                {detail.rating.count} reviews
              </Text>
            </View>
            <Image
              source={{uri: detail.image}}
              alt="image"
              style={{width: 'auto', height: 400}}
            />
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={true}
          color="blue"
          size={50}
        />
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    margin: 10,
    marginRight: 20,
    marginLeft: 20,

    overflow: 'hidden',
    // backgroundColor:'blue',
    // borderWidth:10,
    // borderRadius:50,
  },
  container: {
    marginTop: 20,
  },
  price: {
    marginBottom: 4,
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  description: {
    fontWeight: 'normal',
    marginBottom: 4,
    paddingTop: 5,
    fontSize: 20,
    fontFamily: 'Caveat-Regular',
  },
});
