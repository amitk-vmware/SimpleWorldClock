import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  // RenderItemParams,
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center'}}>
              <Text>{`${item.name}`}</Text>
              <Text>{`${item.region}`}</Text>
              <Text>{`${item.country}`}</Text>
            </View>
            <View>
              <Clock timezone={convertTimezone(item.timezone)} />
            </View>
            <View>
              <Text>Lat / Lon</Text>
              <Text>{`${item.latitude.toFixed(2)}° / ${item.longitude.toFixed(
                2,
              )}°`}</Text>
              <Text>Population:</Text>
              <Text>{item.population}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={regions}
      onDragEnd={({data}) => setRegions(data)}
      renderItem={renderItem}
      keyExtractor={item => item.name}
    />
  );
};

const styles = StyleSheet.create({
  rowItem: {
    margin: 10,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
  },
});

export default TimerList;
