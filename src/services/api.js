import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createPoll = async (question, options) => {
  const response = await axios.post(`${API_URL}/polls`, { question, options });
  return response.data;
};

export const getActivePolls = async () => {
  const response = await axios.get(`${API_URL}/polls/active`);
  return response.data;
};

export const castVote = async (pollId, optionIndex, voterId) => {
  const response = await axios.post(`${API_URL}/votes`, { pollId, optionIndex, voterId });
  return response.data;
};

export const getResults = async (pollId) => {
  const response = await axios.get(`${API_URL}/polls/${pollId}/results`);
  return response.data;
};

export const closePoll = async (pollId) => {
  const response = await axios.post(`${API_URL}/polls/${pollId}/close`);
  return response.data;
};