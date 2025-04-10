import React, { useState } from 'react';
import { loginOrRegister } from '../api';

const LoginPage = ({ onLogin }) => {
  const [phoneNum, setPhoneNum] = useState('');

  const handleSubmit = async () => {
    const res = await loginOrRegister(phoneNum);
    onLogin(res.data);
  };

  return (
    <div>
      <h2>携帯番号を入力</h2>
      <input value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
      <button onClick={handleSubmit}>次へ</button>
    </div>
  );
};

export default LoginPage;