// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { loginOrRegister } from '../api';

function LoginPage({ onPhoneSubmit, onLogin }) {
  const [phoneNum, setPhoneNum] = useState('');

  const handleSubmit = async () => {
    if (phoneNum === '88886666') {
      onPhoneSubmit(phoneNum, true); // 管理者番号
    } else {
      const res = await loginOrRegister(phoneNum);
      onLogin(res.data); // 通常ユーザー
    }
  };

  return (
    <div>
      <h2>携帯番号入力</h2>
      <input
        type="text"
        value={phoneNum}
        onChange={(e) => setPhoneNum(e.target.value)}
        placeholder="電話番号を入力"
      />
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
}

export default LoginPage;