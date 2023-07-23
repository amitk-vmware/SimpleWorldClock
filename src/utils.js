import {Share, Alert} from 'react';

export const convertTZ = (date, tzString) => {
  return date.toLocaleString('en-US', {timeZone: tzString});
};

export const convertTimezone = str => {
  return str.replace('__', '/');
};

export const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (e) {
    Alert.alert(e.message);
  }
};