import axios from 'axios';

const API_ID = '64a31d40b45881cc0ae625d4';

const errorHandler = error => {
  if (error.response.status === 400) {
    alert("We're sorry, but you've reached the end of search results.");
  } else if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

const mockApi = axios.create({
  baseURL: `https://${API_ID}.mockapi.io`,
  timeout: 10000,
});

const mockApiGet = async () => {
  const response = await mockApi.get('/contacts').catch(e => errorHandler(e));
  return response.data;
};

const mockApiPost = async data => {
  const response = await mockApi
    .post('/contacts/', data)
    .catch(e => errorHandler(e));
  return response.data;
};

const mockApiDelete = async id => {
  const response = await mockApi
    .delete(`/contacts/${id}`)
    .catch(e => errorHandler(e));
  return response;
};

export const getPromiseData = async promise =>
  await promise.then(data => {
    return data;
  });
const api = {
  mockApiGet,
  mockApiPost,
  mockApiDelete,
  getPromiseData,
};
export default api;
