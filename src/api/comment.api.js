import axios from 'axios';

export const getComments = async () => {
  const request = await axios.get('/comment');
  return request.data;
};

export const getCommentById = async (id) => {
  const request = await axios.get(`/comment/${id}`);
  // console.log(request.data);
  return request.data;
};
