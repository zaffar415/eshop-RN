import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer, useNavigationState} from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import store from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {

  return (
    <>
      <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
      </Provider>
    </>
  )
}

export default App;