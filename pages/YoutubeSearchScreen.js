import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import { buscarVideos } from '../youtube';

export default function YouTube() {
  const [pesquisa, setPesquisa] = useState('');
  const [videos, setVideos] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const pesquisar = async () => {
    try {
      const resultados = await buscarVideos(pesquisa);
      if (resultados.length === 0) {
        setMensagem('Nenhum Vídeo encontrado');
      } else {
        setMensagem('');
        setVideos(resultados);
      }
    } catch (erro) {
      console.error('Erro ao pesquisar vídeos:', erro);
      setMensagem('Erro ao pesquisar vídeos');
    }
  };

  return (
    <LinearGradient
      colors={['rgba(255,38,0,1)', 'rgba(111,68,60,1)']} // Cores do gradiente radial
      start={{ x: 0.5, y: 0.1 }}
      end={{ x: 0.5, y: 0.81 }}
      style={styles.container}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.containerPesquisa}>
          <TextInput
            style={styles.entrada}
            placeholder="Digite sua pesquisa"
            value={pesquisa}
            onChangeText={setPesquisa}
          />
          <TouchableOpacity style={styles.botao} onPress={pesquisar}>
            <Text style={styles.textoBotao}>Pesquisar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {mensagem ? (
            <Text style={styles.mensagem}>{mensagem}</Text>
          ) : (
            videos.map(video => (
              <View key={video.id.videoId} style={styles.containerVideo}>
                <Text style={styles.tituloVideo}>{video.snippet.title}</Text>
                <WebView
                  style={styles.webview}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ html: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>` }}
                />
              </View>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'transparent', // Fundo transparente para o gradiente ser visível
    borderRadius: 8,
    margin: 20,
  },
  entrada: {
    height: 40,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  botao: {
    backgroundColor: '#03dac5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mensagem: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
  containerVideo: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tituloVideo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  webview: {
    width: '100%',
    aspectRatio: 16 / 9,
  }
});
