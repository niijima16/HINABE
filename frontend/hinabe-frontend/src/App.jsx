// src/App.jsx
import React, { useState, useEffect } from 'react';
import LoginQRCode from './components/LoginQRcode';
import LoginPage from './components/LoginPage';
import AdminPasswordPage from './components/AdminPasswordPage';
import QuestionnairePage from './components/QuestionnairePage';
import CouponPage from './components/CouponPage';
import AdminQuestionnairePage from './components/AdminQuestionnairePage';
import api, { parseJwt } from './api';

function App() {
  const [showQr, setShowQr] = useState(true);
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [phoneNum, setPhoneNum] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setStep(1);
    setPhoneNum(null);
    setShowQr(true);
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
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setShowQr(false);
      } catch {
        localStorage.clear();
        delete api.defaults.headers.common['Authorization'];
      }
    }
  }, []);

  // 1) QRコード表示
  if (showQr) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <LoginQRCode />
        <button onClick={() => setShowQr(false)} style={{ marginTop: '1rem' }}>
          ログイン画面へ進む
        </button>
      </div>
    );
  }

  // 2) 未ログイン
  if (!user) {
    if (step === 'admin-password') {
      return <AdminPasswordPage phoneNum={phoneNum} onLogin={u => setUser(u)} />;
    }
    return (
      <LoginPage
        onPhoneSubmit={(num, isAdmin) => {
          setPhoneNum(num);
          setStep(isAdmin ? 'admin-password' : 2);
        }}
        onLogin={u => {
          setUser(u);
          setStep(2);
        }}
      />
    );
  }

  // 3) ログイン済み
  if (user.isAdmin) {
    return <AdminQuestionnairePage user={user} onLogout={handleLogout} />;
  }
  if (step === 2) {
    return <QuestionnairePage user={user} onComplete={() => setStep(3)} />;
  }
  if (step === 3) {
    return <CouponPage user={user} onLogout={handleLogout} />;
  }

  return null;
}

export default App;