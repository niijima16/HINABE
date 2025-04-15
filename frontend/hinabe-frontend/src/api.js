import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// ユーザー用
export const loginOrRegister = (phoneNum) =>
  api.post('/auth/', { phoneNum });

export const fetchQuestionnaire = () =>
  api.get('/questionnaires-list/');

export const submitQuestionnaire = (phoneNum, questionnaireId, responses) =>
  api.post('/submit-questionnaire/', { phoneNum, questionnaire: questionnaireId, responses });

export const drawCoupon = (phoneNum) =>
  api.post('/lottery/', { phoneNum });

// 管理者用：アンケート操作
export const fetchAllQuestionnaires = () =>
  api.get('/questionnaires/');

export const updateQuestionnaire = (id, data) =>
  api.patch(`/questionnaires/${id}/`, data);

export const deleteQuestionnaire = (id) =>
  api.delete(`/questionnaires/${id}/`);

export const activateQuestionnaire = (id) =>
  api.post(`/questionnaires/${id}/activate/`);

export const loginAdmin = (phoneNum, password) =>
  api.post('/admin-auth/', { phoneNum, password });