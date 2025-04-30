import React, { useState, useEffect } from 'react';
import {
  fetchAllQuestionnaires,
  updateQuestionnaire,
  deleteQuestionnaire,
  activateQuestionnaire,
  createQuestionnaire,
} from '../api';

const AdminQuestionnairePage = ({ user, onLogout }) => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQuestions, setEditQuestions] = useState('');
  const [previewSelections, setPreviewSelections] = useState({}); // ← これで全体管理

  const [newName, setNewName] = useState('');
  const [newQuestions, setNewQuestions] = useState('');

  useEffect(() => {
    if (!user?.isAdmin) {
      console.warn('管理者でないためアンケート管理ページにアクセスできません');
      return;
    }
  
    load(); // 管理者だけが読み込む
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

  const handleCreate = async () => {
    try {
      const parsed = JSON.parse(newQuestions);
      await createQuestionnaire({
        name: newName,
        questions: parsed,
      });
      setNewName('');
      setNewQuestions('');
      load();
    } catch (err) {
      alert("新規作成失敗: JSONの形式に誤りがあるかもしれません");
    }
  };

  const handlePreviewChange = (qId, question, value) => {
    setPreviewSelections(prev => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || {}),
        [question]: value,
      }
    }));
  };

  return (
    <div>
      <h2>アンケート管理</h2>
      <button onClick={onLogout}>ログアウト</button>

      <div style={{ border: '1px solid #444', padding: '1em', marginTop: '1em' }}>
        <h3>🆕 新しいアンケート作成</h3>
        <input
          placeholder="アンケート名"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <textarea
          placeholder={`{
  "name": "テストアンケート",
  "questions": {
    "年齢": ["10代", "20代"],
    "性別": ["男性", "女性"]
  }
}`}
          value={newQuestions}
          onChange={(e) => setNewQuestions(e.target.value)}
          rows={10}
        />
        <button onClick={handleCreate}>作成</button>
      </div>

      {questionnaires.map(q => (
        <div key={q.id} style={{ border: '1px solid #ccc', margin: '1em 0', padding: '1em' }}>
          {editingId === q.id ? (
            <>
              <input value={editName} onChange={e => setEditName(e.target.value)} />
              <textarea
                rows={10}
                value={editQuestions}
                onChange={e => setEditQuestions(e.target.value)}
              />
              <button onClick={handleSave}>保存</button>
              <button onClick={() => setEditingId(null)}>キャンセル</button>
            </>
          ) : (
            <>
              <h3>{q.name}</h3>
              {Object.entries(q.questions.questions).map(([question, options]) => (
                <div key={question} style={{ marginBottom: '1em' }}>
                  <label style={{ fontWeight: 'bold' }}>{question}</label>
                  <br />
                  <select
                    value={(previewSelections[q.id]?.[question]) || ''}
                    onChange={(e) => handlePreviewChange(q.id, question, e.target.value)}
                    style={{ marginTop: '0.5em' }}
                  >
                    <option value="">選択</option>
                    {options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
              <button onClick={() => handleEdit(q)}>編集</button>
              <button onClick={() => deleteQuestionnaire(q.id).then(load)}>削除</button>
              <button onClick={() => activateQuestionnaire(q.id).then(load)}>
                {q.is_active ? '✅ 適用中' : '適用'}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminQuestionnairePage;