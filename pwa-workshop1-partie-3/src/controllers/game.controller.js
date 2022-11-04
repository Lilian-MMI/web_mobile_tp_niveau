import axiosApi from './axios.config';

export default {
  async getQuizzs(params) {
    return await axiosApi.get('mcq', { params });
  },

  async getQuizz(gameId, withReponse) {
    return await axiosApi.get(`mcq/${gameId}`, { params: withReponse });
  },

  async checkAnswers(answers, gameId) {
    return await axiosApi.post(`mcq/${gameId}`, answers);
  },
};
