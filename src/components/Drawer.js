import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawer';
import Home from './Home';

const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNav.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: styles.drawerStyle,
        headerTintColor: styles.headerTintColor,
      }}>
      <DrawerNav.Screen name="HOME" component={Home} />
    </DrawerNav.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: 'lightblue',
  },
  headerStyle: {
    backgroundColor: 'lightbrown',
  },
  headerTintColor: {

  }
});

export default Drawer;
