import React, { useState, useEffect } from 'react';
import {
  fetchAllQuestionnaires,
  updateQuestionnaire,
  deleteQuestionnaire,
  activateQuestionnaire
} from '../api';

const AdminQuestionnairePage = ({ user, onLogout }) => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQuestions, setEditQuestions] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await fetchAllQuestionnaires();
      setQuestionnaires(res.data);
    } catch (err) {
      console.error("アンケート取得エラー:", err);
    }
  };

  const handleEdit = (q) => {
    setEditingId(q.id);
    setEditName(q.name);
    setEditQuestions(JSON.stringify(q.questions, null, 2));
  };

  const handleSave = async () => {
    try {
      const parsedQuestions = JSON.parse(editQuestions);
      await updateQuestionnaire(editingId, {
        name: editName,
        questions: parsedQuestions,
      });
      setEditingId(null);
      load();
    } catch (err) {
      alert("保存失敗しました");
    }
  };

  return (
    <div>
      <h2>アンケート管理</h2>
      <button onClick={onLogout}>ログアウト</button>

      {questionnaires.map(q => (
        <div key={q.id} style={{ border: '1px solid #ccc', margin: '1em 0', padding: '1em' }}>
          {editingId === q.id ? (
            <>
              <input value={editName} onChange={e => setEditName(e.target.value)} />
              <textarea rows={10} value={editQuestions} onChange={e => setEditQuestions(e.target.value)} />
              <button onClick={handleSave}>保存</button>
              <button onClick={() => setEditingId(null)}>キャンセル</button>
            </>
          ) : (
            <>
              <h3>{q.name}</h3>
              <pre>{JSON.stringify(q.questions, null, 2)}</pre>
              <button onClick={() => handleEdit(q)}>編集</button>
              <button onClick={() => deleteQuestionnaire(q.id).then(load)}>削除</button>
              <button onClick={() => activateQuestionnaire(q.id).then(load)}>適用</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminQuestionnairePage;