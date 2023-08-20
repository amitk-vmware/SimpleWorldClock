import {Share, Alert} from 'react-native';

export const convertTZ = (date, tzString) => {
  return date.toLocaleString('en-US', {timeZone: tzString});
};

export const convertTimezone = str => {
  return str.replaceAll('__', '/');
};

export const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'Stay synchronized with this world clock app for every location, AppLink: ',
      url: 'https:',
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

export const widthConstant = 30;
export const widthConstantModal = 100;

export const themes = {
  default: {
    backgroundColor: '#1893f8',
    color: '#F5F5F5',
    modelBackgroundColor: '#76b9f0',
    searchBarBackgroundColor: '#FFE55C',
    searchResultBackgroundColor: '#ffffb7',
    buttonBackgroundColor: '#FFDE2E',
    buttonTextColor: '#000000',
    headerColor: '#171810',
  },
};

// Will release in future releases

export const clockType = ['12_h', '24_h'];

export const defaultClockType = '12_h';

// export const timerFormats = {
//   'HH:MM:SS': {
//     hour: ''
//   },

// }
