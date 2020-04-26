// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

    /* <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          inactiveBackgroundColor: '#2F2F2F',
          activeBackgroundColor: '#2F2F2F',
        }}
        style={{
          borderTopWidth: 0,
          borderTopColor: "transparent"
        }}  
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
      </Tab.Navigator>
    </NavigationContainer> */