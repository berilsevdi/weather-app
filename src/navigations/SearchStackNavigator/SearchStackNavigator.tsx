import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CityDetailScreen from '../../scenes/HomeFlow/CityDetail/CityDetailScreen.component';
import SearchScreen from '../../scenes/HomeFlow/Search/SearchScreen.component';
import { RootStackParamList } from '../AppNavigator';
import { styles } from './SearchStackNavigator.style';

const Stack = createStackNavigator<RootStackParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='City Detail' component={CityDetailScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
