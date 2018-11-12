import axios from 'axios';

export const getArticles = async () => {
  const request = await axios.get('/article');
  return request.data;
};

export const getArticleById = async (id) => {
  const request = await axios.get(`/article/${id}`);
  return request.data;
};
