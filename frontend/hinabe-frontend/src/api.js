import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const loginOrRegister = (phoneNum) =>
  api.post('/auth/', { phoneNum });

export const fetchQuestionnaire = () =>
  api.get('/questionnaires-list/');

export const submitQuestionnaire = (phoneNum, questionnaireId, responses) =>
  api.post('/submit-questionnaire/', { phoneNum, questionnaire: questionnaireId, responses });

export const drawCoupon = (phoneNum) =>
  api.post('/lottery/', { phoneNum });