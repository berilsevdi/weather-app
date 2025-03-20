import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CityDetailScreen from '../../scenes/HomeFlow/CityDetail/CityDetailScreen.component';
import HomeScreen from '../../scenes/HomeFlow/Home/HomeScreen.component';
import { RootStackParamList } from '../AppNavigator';
import { styles } from './HomeStackNavigator.style';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='City Detail' component={CityDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
