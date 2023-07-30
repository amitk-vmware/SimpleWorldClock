import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getData} from '../AsyncStorage';

const Clock = ({timezone, timeStyle, dayStyle}) => {
  const [date, setDate] = useState(new Date());
  const timer = useRef(null);
  const clockType = getData('clockType');

  useEffect(() => {
    timer.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [timezone]);

  const returnTime = () => {
    const options = {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: clockType === null ? false : clockType,
    };
    return date.toLocaleTimeString('en-US', options);
  };

  const returnDate = () => {
    return date.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.time, timeStyle]}>{returnTime()}</Text>
      <Text style={[styles.day, dayStyle]}>{returnDate()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 24,
    color: 'black',
  },
});

export default Clock;
