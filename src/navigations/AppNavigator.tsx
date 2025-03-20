import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigator from './BottomTabNavigator/BottomTabNavigator.component';

export type RootStackParamList = {
  HomeMain: undefined;
  Search: undefined;
  'City Detail': { cityName: string };
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
