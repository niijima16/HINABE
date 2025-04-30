// src/App.jsx
import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import AdminPasswordPage from './components/AdminPasswordPage';
import QuestionnairePage from './components/QuestionnairePage';
import CouponPage from './components/CouponPage';
import AdminQuestionnairePage from './components/AdminQuestionnairePage';
import api, { parseJwt } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [phoneNum, setPhoneNum] = useState(null);

  console.log("App内 user:", user);
  console.log("App内 step:", step);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setStep(1);
    setPhoneNum(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = parseJwt(token);
        setUser({
          id: payload.user_id,
          phoneNum: payload.phoneNum,
          isAdmin: payload.isAdmin,
        });
        // ✅ トークンがある場合だけ Authorization ヘッダーをセット
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error('JWT解析エラー', err);
        localStorage.clear();
        delete api.defaults.headers.common['Authorization'];
      }
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, []);

  if (!user) {
    if (step === 'admin-password') {
      return <AdminPasswordPage phoneNum={phoneNum} onLogin={(u) => setUser(u)} />;
    }
    return (
      <LoginPage
        onPhoneSubmit={(num, isAdmin) => {
          setPhoneNum(num);
          setStep(isAdmin ? 'admin-password' : 2);
        }}
        onLogin={(u) => {
          setUser(u);
          setStep(2); 
        }}
      />
    );
  }

  if (user.isAdmin) return <AdminQuestionnairePage user={user} onLogout={handleLogout} />;
  if (step === 2) return <QuestionnairePage user={user} onComplete={() => setStep(3)} />;
  if (step === 3) return <CouponPage user={user} onLogout={handleLogout} />;
  return null;
}

export default App;