import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Drawer from './Drawer';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="First">
      <Stack.Screen
        name="First"
        component={Drawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
