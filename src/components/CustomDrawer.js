import React from 'react';
import {Linking} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';

const options = [
  {
    label: 'Share',
    icon: 'share',
    type: 'share',
  },
  {
    label: 'Support',
    icon: 'support',
    type: 'Linking',
    url: 'mailto:am.kumar1293@gmail.com?subject=Need Assitance',
  },
  {
    label: 'Feedback',
    icon: 'note',
    type: 'Linking',
    url: 'mailto:am.kumar1293@gmail.com?subject=Suggestions and Feedback for the App',
  },
];

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Simple World Clock"
        icon={({focused, color, size}) => <LineIcons name="clock" size={20} color="black" />}
      />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
