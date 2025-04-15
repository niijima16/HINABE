import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import AdminPasswordPage from './components/AdminPasswordPage';
import QuestionnairePage from './components/QuestionnairePage';
import CouponPage from './components/CouponPage';
import AdminQuestionnairePage from './components/AdminQuestionnairePage';

function App() {
  const [user, setUser] = useState(null);         // ログインユーザー情報
  const [step, setStep] = useState(1);            // ユーザー用フロー制御
  const [adminPhone, setAdminPhone] = useState(null); // 管理者認証用

  // ログイン後の情報確認（開発用）
  if (user) {
    console.log('ログインユーザー情報:', user);
  }

  // 管理者ログイン成功 → 管理画面へ遷移
  if (user?.isAdmin) {
    return <AdminQuestionnairePage user={user} />;
  }

  // 管理者番号が入力され、パスワード待ち状態
  if (!user && adminPhone) {
    return <AdminPasswordPage
      phoneNum={adminPhone}
      onLogin={(adminUser) => setUser(adminUser)}
    />;
  }

  // 通常ログイン画面（adminかどうかはLoginPageが判断）
  if (!user) {
    return <LoginPage
      onLogin={(u) => {
        setUser(u);
        setStep(2);
      }}
      onAdminRoute={(phoneNum) => setAdminPhone(phoneNum)}
    />;
  }

  // 一般ユーザー用のフロー（アンケート → クーポン）
  if (step === 2) {
    return <QuestionnairePage user={user} onComplete={() => setStep(3)} />;
  }

  if (step === 3) {
    return <CouponPage user={user} />;
  }

  return null; // fallback（あり得ないが安全のため）
}

export default App;