import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import Drawer from './Drawer';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const DrawerComponent = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="HOME" component={Home} />
//     </Drawer.Navigator>
//   );
// };

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
