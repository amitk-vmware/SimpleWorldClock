import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawer';
import Home from './Home';
import {themes} from '../utils';

const DrawerNav = createDrawerNavigator();
const theme = themes.default;

const Drawer = () => {
  return (
    <DrawerNav.Navigator
      initialRouteName="HOME"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: styles.drawerStyle,
        headerTintColor: theme.color,
        headerStyle: styles.headerStyle,
        headerTitleAlign: 'center',
      }}>
      <DrawerNav.Screen
        name="HOME"
        component={Home}
        options={{headerTitle: 'WORLD TICK'}}
      />
    </DrawerNav.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: theme.backgroundColor,
  },
  headerStyle: {
    backgroundColor: theme.headerColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  headerTintColor: {
    color: theme.color,
  },
});

export default Drawer;
