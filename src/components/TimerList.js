import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Clock from './clock';
import {convertTimezone} from '../utils';

const TimerList = ({regions, setRegions}) => {
  const renderItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            // eslint-disable-next-line react-native/no-inline-styles
            {backgroundColor: isActive ? 'red' : 'white'},
          ]}>
          <View style={styles.itemContainer}>
            <View style={styles.placeContainer}>
              <Text style={[styles.text, styles.name]}>{`${item.name}`}</Text>
              <Text
                style={[styles.text, styles.region]}>{`${item.region}`}</Text>
              <Text
                style={[styles.text, styles.country]}>{`${item.country}`}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Clock timezone={convertTimezone(item.timezone)} />
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
                {item.population}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={{flex: 1, position: 'relative'}}> */}
        <DraggableFlatList
          data={regions}
          onDragEnd={({data}) => setRegions(data)}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    top: 100,
    width: 393,
    position: 'absolute',
  },
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
  },
});

export default TimerList;
