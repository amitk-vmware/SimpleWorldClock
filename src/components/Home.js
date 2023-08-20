import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {placeDetailsApi} from '../Api';
import TimerList from './TimerList';
import {storeObject, getObject} from '../AsyncStorage';
import AddPlace from './AddPlace';
import {themes} from '../utils';

const theme = themes.default;
const Home = () => {
  const [regions, setRegions] = useState([]);

  const onRegionSelect = async region => {
    const region_ids = regions.map(r => r.id);
    const details = await placeDetailsApi(region.id);
    if (region_ids.includes(region.id) === true) {
      return;
    }
    setRegions([...regions, details]);
  };

  const removeRegion = id => {
    const remainingRegions = regions.filter(region => region.id !== id);
    setRegions(remainingRegions);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      const reg = await getObject('regions');
      if (reg !== null) {
        setRegions(reg);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    const setReg = async () => {
      await storeObject('regions', regions);
    };
    setReg();
  }, [regions]);

  return (
    <View style={styles.container}>
      <AddPlace
        onRegionSelect={item => onRegionSelect(item)}
        regions={regions}
      />
      <TimerList
        regions={regions}
        setRegions={setRegions}
        removeRegion={id => removeRegion(id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.backgroundColor,
  },
});

export default Home;
