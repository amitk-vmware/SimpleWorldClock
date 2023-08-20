import React, {useState, useRef, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import {placesApi} from '../Api';
import {themes, widthConstant, widthConstantModal} from '../utils';

const theme = themes.default;

const AddPlace = ({onRegionSelect, regions}) => {
  const [places, setPlaces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const regionIds = regions.map(r => r.id);
  const searchBoxRef = useRef(null);

  const onPlaceSearch = async () => {
    setLoading(true);
    const result = await placesApi(searchValue);
    setPlaces(result);
    setLoading(false);
  };

  const onClose = () => {
    setModalVisible(!modalVisible);
    setSearchValue('');
    setPlaces([]);
  };

  const handleClearSearch = () => {
    setPlaces([]);
    setSearchValue('');
    searchBoxRef.current.focus();
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = item => {
    return (
      <TouchableOpacity onPress={() => onRegionSelect(item)} key={item.id}>
        <View style={styles.item}>
          <Text style={styles.itemStyle}>{item.name}</Text>
          {regionIds.includes(item.id) && (
            <LineIcons name="check" color="green" size={20} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.model}>
          <View style={styles.modalView}>
            <View style={styles.searchView}>
              <View style={styles.searchBar}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Region text(click icon)"
                  value={searchValue}
                  onChangeText={setSearchValue}
                  ref={searchBoxRef}
                  autoFocus={true}
                />
                <Feather
                  name="search"
                  size={searchValue === '' ? 20 : 28}
                  color={searchValue === '' ? 'grey' : 'black'}
                  style={{paddingRight: 10}}
                  onPress={onPlaceSearch}
                />
              </View>
              {loading ? (
                <ActivityIndicator
                  animating={loading}
                  size="large"
                  color="gold"
                />
              ) : (
                <View style={{height: 300}}>
                  {places && places.map(place => Item(place))}
                  {places && places.length === 0 ? (
                    ''
                  ) : (
                    <Pressable
                      style={styles.clearSearchPressable}
                      onPress={handleClearSearch}>
                      <Text style={styles.clearSearch}>Clear Search</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
            <View>
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible(true)}>
        <LineIcons name="plus" color={theme.buttonTextColor} size={20}>
          {'  '}Add Places
        </LineIcons>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  model: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 5,
    flex: 0.9,
    backgroundColor: theme.modelBackgroundColor,
    borderRadius: 15,
    padding: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchView: {
    margin: 1,
  },
  openButton: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 2,
    height: 50,
    width: Dimensions.get('window').width - widthConstant,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.buttonBackgroundColor,
  },
  closeButton: {
    backgroundColor: theme.buttonBackgroundColor,
    width: Dimensions.get('window').width - widthConstantModal,
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  textStyle: {
    color: theme.buttonTextColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  options: {
    fontSize: 20,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: Dimensions.get('window').width - widthConstantModal,
  },
  item: {
    size: 20,
    padding: 5,
    margin: 1,
    backgroundColor: theme.searchResultBackgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemStyle: {
    fontSize: 20,
    color: 'black',
  },
  clearSearchPressable: {
    size: 20,
    padding: 5,
    margin: 1,
    backgroundColor: theme.buttonBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  clearSearch: {
    fontSize: 21,
    color: 'black',
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#edc531',
  },
});

export default AddPlace;
