import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import BottomSheet from './screens/BottomSheet';
import CameraModule from './screens/CameraModule';

const App = () => {
  return <CameraModule />;
};

export default App;
