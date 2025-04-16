// src/components/AdminQuestionnairePage.jsx

import React, { useEffect, useState } from 'react';
import {
  fetchAllQuestionnaires,
  deleteQuestionnaire,
  activateQuestionnaire
} from '../api';

function AdminQuestionnairePage({ user, onLogout }) {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const res = await fetchAllQuestionnaires();
      setList(res.data);
    } catch (err) {
      console.error('取得エラー', err);
    }
  };

  const handleDelete = async (id) => {
    await deleteQuestionnaire(id);
    load();
  };

  const handleActivate = async (id) => {
    await activateQuestionnaire(id);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>アンケート管理画面</h2>

      {/* ✅ ログアウトボタン */}
      <button onClick={onLogout} style={{ marginBottom: '1rem' }}>
        ログアウト
      </button>

      <ul>
        {list.map((q) => (
          <li key={q.id}>
            <strong>{q.name}</strong>
            <button onClick={() => handleActivate(q.id)}>適用</button>
            <button onClick={() => handleDelete(q.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminQuestionnairePage;