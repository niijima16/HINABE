// src/components/QuestionnairePage.jsx
import React, { useEffect, useState } from 'react';
import { fetchQuestionnaire, submitQuestionnaire } from '../api';

const QuestionnairePage = ({ user, onComplete }) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestionnaire().then(res => setQuestionnaire(res.data[0]));
  }, []);

  const handleSubmit = async () => {
    console.log("送信データ", {
      phoneNum: user.phoneNum,
      questionnaire: questionnaire.id,
      responses: answers
    });
  
    try {
      await submitQuestionnaire(user.phoneNum, questionnaire.id, answers);
      onComplete();
    } catch (err) {
      console.error("アンケート送信失敗:", err.response?.data || err.message);
      alert("アンケート送信に失敗しました");
    }
  };

  if (!questionnaire) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>{questionnaire.name}</h2>
      {Object.entries(questionnaire.questions).map(([q, opts]) => (
        <div key={q}>
          <label>{q}</label>
          <select onChange={e => setAnswers({ ...answers, [q]: e.target.value })}>
            <option value="">選択</option>
            {opts.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
};

export default QuestionnairePage;