import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { WebView } from 'react-native-webview';
import { buscarVideosVimeo } from '../vimeo';

export default function Vimeo() {
  const [pesquisa, setPesquisa] = useState('');
  const [videos, setVideos] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const pesquisar = async () => {
    try {
      const resultados = await buscarVideosVimeo(pesquisa);
      if (resultados.length === 0) {
        setMensagem('Nenhum Vídeo encontrado');
        setVideos([]);
      } else {
        setMensagem('');
        setVideos(resultados);
      }
    } catch (erro) {
      console.error('Erro ao pesquisar vídeos:', erro);
      setMensagem('Erro ao pesquisar vídeos');
      setVideos([]);
    }
  };

  return (
    <KeyboardAvoidingView style={estilos.container}>
      <View style={estilos.containerPesquisa}>
        <TextInput
          style={estilos.entrada}
          placeholder="Digite sua pesquisa"
          value={pesquisa}
          onChangeText={setPesquisa}
        />
        <TouchableOpacity style={estilos.botao} onPress={pesquisar}>
          <Text style={estilos.textoBotao}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={estilos.scrollView}>
        {mensagem ? (
          <Text style={estilos.mensagem}>{mensagem}</Text>
        ) : (
          videos.map(video => (
            <View key={video.uri} style={estilos.containerVideo}>
              <Text style={estilos.tituloVideo}>{video.name}</Text>
              <WebView
                style={estilos.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ html: `<iframe width="100%" height="315" src="https://player.vimeo.com/video/${video.uri.split('/').pop()}" frameborder="0" allowfullscreen></iframe>` }}
              />
            </View>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86c9ef',
  },
  containerPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
