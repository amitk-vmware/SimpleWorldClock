import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {placesApi} from '../Api';

const Home = ({setRegions, regions}) => {
  const [places, setPlaces] = useState([]);
  // const [regions, setRegions] = useState([]);
  // const [searchValue, setSearchValue] = useState();

  const onPlaceSearch = async text => {
    const result = await placesApi(text);
    setPlaces(result);
  };

  const onRegionSelect = region => {
    // setSearchValue();
    setRegions(region);
  };

  console.log(regions, 'regions');
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter Place"
        onChangeText={x => onPlaceSearch(x)}
        // value={searchValue}
      />
      {/* <Text>A new component</Text> */}
      {/* <TextInput style={styles.input}/> */}

      {places && places.length
        ? places.map((place, index) => (
            <View key={index} style={{padding: 10}}>
              <Text onPress={() => onRegionSelect(place)}>{place.name}</Text>
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderColor: 'lightgreen',
    height: 40,
    borderWidth: 1,
    margin: 5,
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'blue',
  },
});

export default Home;
