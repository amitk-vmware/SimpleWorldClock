import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {onShare, themes} from '../utils';

const theme = themes.default;

const options = [
  {
    label: 'Share',
    icon: 'share',
    type: 'share',
  },
  {
    label: 'Support',
    icon: 'support',
    type: 'linking',
    url: 'mailto:am.kumar1293@gmail.com?subject=Need Assitance',
  },
  {
    label: 'Feedback',
    icon: 'note',
    type: 'linking',
    url: 'mailto:am.kumar1293@gmail.com?subject=Suggestions and Feedback for the App',
  },
  {
    label: 'Close',
    icon: 'close',
    type: 'close',
  },
];

const CustomDrawerContent = props => {
  const onPress = option => {
    if (option.type === 'linking') {
      Linking.openURL(option.url);
    } else if (option.type === 'share') {
      onShare();
    } else if (option.type === 'close') {
      props.navigation.closeDrawer();
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Menu Options"
        icon={({focused, color, size}) => (
          <LineIcons name="grid" size={25} color={theme.color} />
        )}
        style={styles.drawerHeader}
        labelStyle={styles.drawerHeaderLabelStyle}
      />
      {options.map(option => (
        <DrawerItem
          key={option.label}
          label={option.label}
          icon={({focused, color, size}) => (
            <LineIcons name={option.icon} size={20} color={theme.color} />
          )}
          onPress={() => onPress(option)}
          style={styles.drawerOption}
          labelStyle={styles.drawerOptionLabel}
        />
      ))}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    paddingLeft: 10,
    justifyContent: 'center',
    backgroundColor: theme.backgroundColor,
    fontFamily: 'sans-sarif',
    height: 90,
  },
  drawerHeaderLabelStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.color,
  },
  drawerOption: {
    backgroundColor: theme.backgroundColor,
  },
  drawerOptionLabel: {
    fontWeight: 'normal',
    color: theme.color,
  },
});

export default CustomDrawerContent;
