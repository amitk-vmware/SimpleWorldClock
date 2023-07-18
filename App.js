import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Home from './src/components/Home';
import Sample from './src/components/Sample';

const App = () => {
  const [regions, setRegions] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <Home
        setRegions={region => setRegions(...regions, region)}
        regions={regions}
      />
      {/* <Sample /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
