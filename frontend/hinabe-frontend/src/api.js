import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// ===== 🔐 JWT認証 =====

export const loginWithJWT = async (phoneNum, password) => {
  const res = await api.post('/jwt/token/', { phoneNum, password });
  const { access, refresh } = res.data;

  // 保存 & ヘッダー設定
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

  return res;
};

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  const res = await api.post('/jwt/refresh/', { refresh });
  const access = res.data.access;
  localStorage.setItem('accessToken', access);
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
};

export const parseJwt = (token) => {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
};

// ===== 🧑‍💼 一般ユーザー用 =====

export const loginOrRegister = (phoneNum) =>
  api.post('/auth/', { phoneNum });

export const fetchQuestionnaire = () =>
  api.get('/questionnaires-list/');

export const submitQuestionnaire = (phoneNum, questionnaireId, responses) =>
  api.post('/submit-questionnaire/', { phoneNum, questionnaire: questionnaireId, responses });

export const drawCoupon = (phoneNum) =>
  api.post('/lottery/', { phoneNum });

// ===== 🛠 管理者用：アンケート操作 =====

export const fetchAllQuestionnaires = () =>
  api.get('/questionnaires/');

export const updateQuestionnaire = (id, data) =>
  api.patch(`/questionnaires/${id}/`, data);

export const deleteQuestionnaire = (id) =>
  api.delete(`/questionnaires/${id}/`);

export const activateQuestionnaire = (id) =>
  api.post(`/questionnaires/${id}/activate/`);