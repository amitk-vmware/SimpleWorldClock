import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import TimerItem from './TimerItem';

const TimerList = ({regions, setRegions, removeRegion}) => {
  const renderItem = ({item, drag, isActive}) => {
    return (
      <TimerItem
        item={item}
        drag={drag}
        removeRegion={removeRegion}
        isActive={isActive}
      />
    );
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={regions}
        onDragEnd={({data}) => setRegions(data)}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
  },
});

export default TimerList;
