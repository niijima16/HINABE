// src/components/AdminPasswordPage.jsx
import React, { useState } from 'react';
import { loginWithJWT, parseJwt } from '../api';  // ✅ 修正ポイント
import api from '../api';

function AdminPasswordPage({ phoneNum, onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await loginWithJWT(phoneNum, password);  // ✅ 修正ポイント
      const payload = parseJwt(res.data.access);
      onLogin({
        id: payload.user_id,
        phoneNum: payload.phoneNum,
        isAdmin: payload.isAdmin,
      });
    } catch (err) {
      setError('ログイン失敗しました。');
    }
  };

  return (
    <div>
      <h2>管理者ログイン</h2>
      <p>電話番号: {phoneNum}</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワードを入力"
      />
      <button onClick={handleSubmit}>ログイン</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AdminPasswordPage;