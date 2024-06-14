import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoasVindas from './pages/boasVindas';
import RotaInterna from './pages/rotaInterna';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BoasVindas">
        <Stack.Screen name="BoasVindas" component={BoasVindas} />
        <Stack.Screen name="RotaInterna" component={RotaInterna} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
