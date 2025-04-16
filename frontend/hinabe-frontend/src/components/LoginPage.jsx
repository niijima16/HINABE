// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { loginWithJWT, parseJwt } from '../api';

const LoginPage = ({ onLogin }) => {
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginWithJWT(phoneNum, password);
      const payload = parseJwt(res.data.access);
      console.log('JWT payload:', payload);

      onLogin({
        id: payload.user_id,
        phoneNum: payload.phoneNum,
        isAdmin: payload.isAdmin,
      });
    } catch (err) {
      console.error('ログインエラー:', err);
      setErrorMsg('ログインに失敗しました。電話番号またはパスワードが間違っている可能性があります。');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <input
        type="text"
        placeholder="電話番号"
        value={phoneNum}
        onChange={(e) => setPhoneNum(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>ログイン</button>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
};

export default LoginPage;