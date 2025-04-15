import React, { useState } from 'react';
import { loginOrRegister } from '../api';

const LoginPage = ({ onLogin, onAdminRoute }) => {
  const [phoneNum, setPhoneNum] = useState('');

  const handleSubmit = async () => {
    if (phoneNum === '88886666') {
      onAdminRoute(phoneNum); // 管理者番号 → パスワード入力ページへ
    } else {
      const res = await loginOrRegister(phoneNum);
      onLogin(res.data);
    }
  };

  return (
    <div>
      <h2>携帯電話入力</h2>
      <input value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
};

export default LoginPage;