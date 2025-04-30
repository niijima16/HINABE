// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// =========================
// 🔐 JWT認証 & トークン処理
// =========================

// JWTログイン（管理者用 or 拡張用）
export const loginWithJWT = async (phoneNum, password) => {
  const res = await api.post('/jwt/token/', { phoneNum, password });
  const { access, refresh } = res.data;

  // トークン保存とAuthorizationヘッダー設定
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

  return res;
};

// リフレッシュトークンを使ってアクセストークンを更新
export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  const res = await api.post('/jwt/refresh/', { refresh });
  const access = res.data.access;

  // 新しいトークン保存 & ヘッダー更新
  localStorage.setItem('accessToken', access);
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

  return access;
};

// JWTペイロードをデコードしてユーザー情報取得
export const parseJwt = (token) => {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
};

// =====================================
// 🧑‍💼 一般ユーザー用エンドポイント
// =====================================

// ユーザー登録 or ログイン（JWTなし）
export const loginOrRegister = async (phoneNum) => {
  const res = await api.post('/user/auth/', { phoneNum });

  const { access, refresh } = res.data;
  if (access && refresh) {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  }

  return res;
};

// 有効なアンケート取得（一覧）
export const fetchQuestionnaire = () =>
  api.get('/coupon/questionnaires-list/');

// アンケート送信
export const submitQuestionnaire = (phoneNum, questionnaireId, responses) =>
  api.post('/coupon/submit-questionnaire/', {
    phoneNum,
    questionnaire: questionnaireId,
    responses
  });

// クーポン抽選
export const drawCoupon = (phoneNum) =>
  api.post('/coupon/lottery/', { phoneNum });

// =====================================
// 🛠 管理者用：アンケート管理エンドポイント
// =====================================

export const fetchAllQuestionnaires = () =>
  api.get('/coupon/questionnaires/');

export const updateQuestionnaire = (id, data) =>
  api.patch(`/coupon/questionnaires/${id}/`, data);

export const deleteQuestionnaire = (id) =>
  api.delete(`/coupon/questionnaires/${id}/`);

export const activateQuestionnaire = (id) =>
  api.post(`/coupon/questionnaires/${id}/activate/`);

export const createQuestionnaire = (data) =>
  api.post('/coupon/questionnaires/', data);

// =====================================
// 🔄 トークン自動更新（axios interceptor）
// =====================================

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 Unauthorizedで未リトライ → リフレッシュ試行
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // リフレッシュ中はキューに追加
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return api(originalRequest);
      } catch (err) {
        console.error("🔑 トークン更新失敗:", err);
        processQueue(err, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // ログイン画面に戻す
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;