import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from './src/components/Home';
import Sample from './src/components/Sample';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './src/components/Navigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  // const [regions, setRegions] = useState([]);

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <Navigation />
          {/* <Sample /> */}
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
});

export default App;
