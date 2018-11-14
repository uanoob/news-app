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

export const createComment = async (user, text) => {
  const postData = {
    user,
    text,
  };
  const request = await axios.post('/comment', postData);
  console.log(request.data);
  return request.data;
};
