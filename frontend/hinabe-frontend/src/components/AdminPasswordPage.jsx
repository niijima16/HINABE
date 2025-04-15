import React, { useState } from 'react';
import { loginAdmin } from '../api';

const AdminPasswordPage = ({ phoneNum, onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await loginAdmin(phoneNum, password);
      onLogin(res.data);  // isAdmin: true を含む
    } catch (err) {
      alert('認証失敗');
    }
  };

  return (
    <div>
      <h2>管理者パスワード</h2>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>認証</button>
    </div>
  );
};

export default AdminPasswordPage;