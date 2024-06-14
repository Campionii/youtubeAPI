import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubeSearchScreen from './YoutubeSearchScreen';
import Vimeo from './Vimeo';

const Tab = createBottomTabNavigator();

const youtubeIcon = require('../assets/youtube_icon.png');
const vimeoIcon = require('../assets/vimeo_icon.png');

// Função para renderizar a tela com fundo gradiente
const TelaComGradiente = ({ children }) => (
  <LinearGradient
    colors={['rgba(0,249,255,1)', 'rgba(175,0,255,1)']}
    start={[0.5, 0.1]}
    end={[0.5, 0.79]}
    style={{ flex: 1 }}
  >
    {children}
  </LinearGradient>
);

export default function RotaInterna() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'YouTube') {
            iconName = youtubeIcon;
          } else if (route.name === 'Vimeo') {
            iconName = vimeoIcon;
          }

          return <Image source={iconName} style={{ width: 20, height: 20 }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: styles.tabBar,
      }}
    >
      <Tab.Screen name="YouTube" component={YoutubeSearchScreen} />
      <Tab.Screen name="Vimeo" component={Vimeo} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent', // Deixa o fundo da tabBar transparente
  },
});
