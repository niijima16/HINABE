import React, { useEffect, useState } from 'react';
import {
  fetchAllQuestionnaires,
  updateQuestionnaire,
  deleteQuestionnaire,
  activateQuestionnaire,
} from '../api';

const AdminQuestionnairePage = () => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);

  const load = async () => {
    const res = await fetchAllQuestionnaires();
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (q) => setEditData(q);

  const handleSave = async () => {
    await updateQuestionnaire(editData.id, editData);
    setEditData(null);
    load();
  };

  const handleDelete = async (id) => {
    await deleteQuestionnaire(id);
    load();
  };

  const handleActivate = async (id) => {
    await activateQuestionnaire(id);
    load();
  };

  return (
    <div>
      <h2>アンケート管理</h2>
      <ul>
        {list.map(q => (
          <li key={q.id}>
            <b>{q.name}</b> {q.is_active ? '✅適用中' : ''}
            <button onClick={() => handleEdit(q)}>編集</button>
            <button onClick={() => handleDelete(q.id)}>削除</button>
            <button onClick={() => handleActivate(q.id)}>適用</button>
          </li>
        ))}
      </ul>

      {editData && (
        <div>
          <h3>編集中: {editData.name}</h3>
          <input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} />
          <textarea value={JSON.stringify(editData.questions, null, 2)}
                    onChange={e => setEditData({...editData, questions: JSON.parse(e.target.value)})} />
          <button onClick={handleSave}>保存</button>
        </div>
      )}
    </div>
  );
};

export default AdminQuestionnairePage;