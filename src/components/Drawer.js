import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawer';
import Home from './Home';

const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNav.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <DrawerNav.Screen name="HOME" component={Home} />
    </DrawerNav.Navigator>
  );
};

const styles = StyleSheet.create({

});

export default Drawer;
