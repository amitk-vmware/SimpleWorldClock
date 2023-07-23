import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {placesApi, placeDetailsApi} from '../Api';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import Clock from './clock';
import {convertTimezone} from '../utils';
import TimerList from './TimerList';

const selectedRegion = [{ "city": "Arwal district", "country": "India", "countryCode": "IN", "deleted": false, "id": 2987439, "latitude": 25.24, "longitude": 84.67, "name": "Arwal district", "population": 700843, "region": "Bihar", "regionCode": "BR", "regionWdId": "Q1165", "timezone": "Asia__Kolkata", "type": "ADM2", "wikiDataId": "Q42917" }]

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [regions, setRegions] = useState(selectedRegion);
  const [clicked, setClicked] = useState(false);
  const [searchValue, setSearchValue] = useState();

  const onPlaceSearch = async text => {
    setSearchValue(text);
    const result = await placesApi(text);
    setPlaces(result);
  };

  const onRegionSelect = async region => {
    const region_ids = regions.map(r => r.id);
    const details = await placeDetailsApi(region.id);
    if (region_ids.includes(region.id) === true) {
      return;
    }
    // console.log(details, 'get details from api');
    setRegions([...regions, details]);
  };

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
      {places && places.length
        ? places.map((place, index) => (
            <View
              style={{height: 20, backgroundColor: 'white', flex: 1}}
              key={index}>
              <Text
                onPress={() => onRegionSelect(place)}
                style={styles.options}>
                {place.name}
              </Text>
            </View>
          ))
        : null}
      <TimerList regions={regions} setRegions={setRegions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 15,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: 'blue',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    margin: 10,
    height: 80,
    backgroundColor: '#d9dbda',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
  },
  options: {
    fontSize: 20,
  },
  rowItem: {

  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: 300,
  },
});

export default Home;
