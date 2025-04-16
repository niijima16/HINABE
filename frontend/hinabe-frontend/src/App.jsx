// src/App.jsx

import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import QuestionnairePage from './components/QuestionnairePage';
import CouponPage from './components/CouponPage';
import AdminQuestionnairePage from './components/AdminQuestionnairePage';
import api, { parseJwt } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);

  // 初回マウント時：トークン復元
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const payload = parseJwt(token);
        setUser({
          id: payload.user_id,
          phoneNum: payload.phoneNum,
          isAdmin: payload.isAdmin,
        });
      } catch (err) {
        console.error('トークン解析エラー:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  }, []);

  // ログイン前
  if (!user) {
    return <LoginPage onLogin={(u) => {
      setUser(u);
      setStep(2);
    }} />;
  }

  // 管理者
  if (user.isAdmin) return <AdminQuestionnairePage user={user} />;

  // 一般ユーザー
  if (step === 2) return <QuestionnairePage user={user} onComplete={() => setStep(3)} />;
  if (step === 3) return <CouponPage user={user} />;

  return null;
}

export default App;