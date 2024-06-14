import axios from 'axios';

const CLIENT_ID = //'cba134cc15700cc1e1b61a9bf9754539b57ca4af'; 
const CLIENT_SECRET =//'b2rFNDnwflHcas/sIFynTWCN0c07bXN69V15KE3VF9E6hZEh5DKZvXFIeU4dwkmJo+niuFJwi70dtjUHv0CQtJpqtKV+Z/L1o3A2VxRjpIV1MHIrr6M8dJ8vzsG0RpVn'; // Seu segredo de cliente do Vimeo
const TOKEN_URL = //'https://api.vimeo.com/oauth/access_token';

const getAccessToken = async () => {
  try {
    const authResponse = await axios.post(TOKEN_URL, {
      grant_type: 'client_credentials'
    }, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4'
      }
    });

    const ACCESS_TOKEN = authResponse.data.access_token;
    return ACCESS_TOKEN;
  } catch (error) {
    console.error('Erro ao obter access token do Vimeo:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const buscarVideosVimeo = async (query) => {
  try {
    const ACCESS_TOKEN = await getAccessToken();

    const resposta = await axios.get('https://api.vimeo.com/videos', {
      params: {
        query: query,
        per_page: 10,
      },
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4',
      },
    });

    return resposta.data.data;
  } catch (erro) {
    console.error('Erro ao buscar vídeos do Vimeo:', erro.response ? erro.response.data : erro.message);
    throw erro;
  }
};
