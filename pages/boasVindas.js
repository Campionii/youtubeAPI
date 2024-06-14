import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Button, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LogoGif from '../assets/logo.gif';  // Verifique a extensão do arquivo

export default function App({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(700)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, translateYAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,249,255,1)', 'rgba(175,0,255,1)']}
        start={[0.5, 0.1]}
        end={[0.5, 0.79]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Animated.Image
          source={LogoGif}
          style={[
            styles.image,
            { transform: [{ translateY: translateYAnim }] }
          ]}
        />
        <Button
          style={styles.botao}
          title="Pesquisar no YouTube e Vimeo"
          onPress={() => navigation.navigate('RotaInterna')}
          color="#af00ff"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,  // Aumentei o tamanho do GIF
    height: 300, // Aumentei o tamanho do GIF
    zIndex: 1,
    marginBottom: 20,
  },
  botao: {
    color: '#FFF',
    backgroundColor: 'rgb(255, 201, 0)',
  },
});
