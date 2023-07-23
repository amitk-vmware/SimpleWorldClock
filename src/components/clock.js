import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {convertTZ} from '../utils';
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';

// dayjs.extend(utc);
// dayjs.extend(timezone);

const Clock = ({timezone}) => {
  const [date, setDate] = useState(new Date());
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [timezone]);

  const returnTime = () => {
    return date.toLocaleTimeString('en-US', {timeZone: timezone});
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
      <Text style={styles.time}>{returnTime()}</Text>
      <Text style={styles.day}>{returnDate()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'w',
  },
  time: {
    fontSize: 30,
    color: 'black',
  },
});

export default Clock;
