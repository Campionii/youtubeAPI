import axios from 'axios';

const API_KEY = //'AIzaSyB9j-AqjqxCIAJwcss_W-oP5WgbyLadO-U';

export const buscarVideos = async (query) => {
  try {
    const resposta = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: query,
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        key: API_KEY,
      },
    });

    return resposta.data.items; 
  } catch (erro) {
    console.error('Erro ao buscar vídeos do YouTube:', erro);
    throw erro;
  }
};
