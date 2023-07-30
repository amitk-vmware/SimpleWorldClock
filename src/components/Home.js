import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, View, Text, Keyboard} from 'react-native';
import {placesApi, placeDetailsApi} from '../Api';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import TimerList from './TimerList';
import {storeData, storeObject, getData, getObject} from '../AsyncStorage';

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [regions, setRegions] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [searchValue, setSearchValue] = useState();

  const onPlaceSearch = async text => {
    setSearchValue(text);
    const result = await placesApi(text);
    const regionIds = regions.map(r => r.id);
    setPlaces(result.filter(r => regionIds.includes(r.id) === false));
  };

  const onRegionSelect = async region => {
    const region_ids = regions.map(r => r.id);
    const details = await placeDetailsApi(region.id);
    if (region_ids.includes(region.id) === true) {
      return;
    }
    console.log(places.filter(p => region_ids.includes(p.id) === false), 'places');
    setPlaces(places.filter(p => region_ids.includes(p.id) === false));
    setRegions([...regions, details]);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      const reg = await getObject('regions');
      if (reg !== undefined) {
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
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onFocus={() => {
            setClicked(true);
          }}
          value={searchValue}
          onChangeText={text => onPlaceSearch(text)}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{padding: 1}}
            onPress={() => {
              setSearchValue('');
              Keyboard.dismiss();
              setClicked(false);
              setPlaces([]);
            }}
          />
        )}
      </View>
      <View style={styles.places}>
        {places && places.length
          ? places.map((place, index) => (
              <View style={styles.results} key={index}>
                <Text
                  onPress={() => onRegionSelect(place)}
                  style={styles.options}>
                  {place.name}
                </Text>
              </View>
            ))
          : null}
      </View>
      <TimerList regions={regions} setRegions={setRegions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'gold',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    height: 80,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#d9dbda',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
  },
  options: {
    fontSize: 20,
  },
  results: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightblue',
    padding: 5,
    marginHorizontal: 10,
  },
  places: {
    zIndex: 1,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: 300,
  },
});

export default Home;
