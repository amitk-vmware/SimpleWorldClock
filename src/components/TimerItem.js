import React, {useState} from 'react';
import {
  Modal,
  View,
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import FeatureIcon from 'react-native-vector-icons/Feather';
import {ScaleDecorator} from 'react-native-draggable-flatlist';
import Clock from './clock';
import {convertTimezone, themes, widthConstantModal} from '../utils';

const theme = themes.default;
const TimerItem = ({item, drag, isActive, removeRegion}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const optionsList = [
    {
      label: 'Drag',
      icon: 'move',
      name: 'drag',
    },
    {
      label: 'Remove',
      icon: 'x',
      name: 'remove',
    },
  ];

  const options = () => {
    setModalVisible(true);
  };

  const handleOptionsPress = optionName => {
    if (optionName === 'drag') {
      setModalVisible(false);
      return drag();
    } else if (optionName === 'remove') {
      removeRegion(item.id);
      setModalVisible(false);
    }
  };

  return (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={options}
        disabled={isActive}
        style={[
          styles.rowItem,
          {backgroundColor: isActive ? 'gold' : 'black'},
        ]}>
        <View style={styles.itemContainer}>
          <View style={styles.placeContainer}>
            <Text style={[styles.text, styles.name]}>{`${item.name}`}</Text>
            <Text style={[styles.text, styles.region]}>{`${item.region}`}</Text>
            <Text
              style={[styles.text, styles.country]}>{`${item.country}`}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Clock
              timezone={convertTimezone(item.timezone)}
              timeStyle={styles.timeStyle}
              dayStyle={styles.dayStyle}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, styles.coordinates]}>Lat / Lon</Text>
            <Text
              style={[
                styles.text,
                styles.coordinatesValue,
              ]}>{`${item.latitude.toFixed(2)}° / ${item.longitude.toFixed(
              2,
            )}°`}</Text>
            <Text style={[styles.text, styles.populationText]}>
              Population:
            </Text>
            <Text style={[styles.text, styles.populationValue]}>
              {`${(item.population / 10000).toFixed(2)}K`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.model}>
          <View style={styles.modalView}>
            <View style={styles.optionsView}>
              {optionsList.map(option => (
                <Pressable
                  key={option.name}
                  style={styles.optionButton}
                  onPress={() => handleOptionsPress(option.name)}>
                  <View style={{flexDirection: 'row'}}>
                    <FeatureIcon
                      name={option.icon}
                      size={20}
                      color={theme.buttonTextColor}
                    />
                    <Text
                      style={styles.textStyle}>{`    ${option.label}`}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    height: 100,
  },
  itemContainer: {
    flex: 1,
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  timeContainer: {
    flex: 0.4,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: theme.color,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coordinates: {
    justifyContent: 'space-between',
  },
  timeStyle: {
    color: theme.color,
    textAlign: 'center',
  },
  dayStyle: {
    color: theme.color,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: theme.buttonBackgroundColor,
    width: Dimensions.get('window').width - widthConstantModal,
    padding: 15,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionButton: {
    width: Dimensions.get('window').width - widthConstantModal,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'gold',
  },
  model: {
    flex: 1,
    justifyContent: 'center',
  },
  optionsView: {
    justifyContent: 'flex-start',
  },
  modalView: {
    margin: 10,
    flex: 0.7,
    backgroundColor: theme.modelBackgroundColor,
    borderRadius: 15,
    padding: 35,
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
});

export default TimerItem;
