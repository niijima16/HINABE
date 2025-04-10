import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import QuestionnairePage from './components/QuestionnairePage';
import CouponPage from './components/CouponPage';

function App() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);

  if (!user) return <LoginPage onLogin={(u) => { setUser(u); setStep(2); }} />;
  if (step === 2) return <QuestionnairePage user={user} onComplete={() => setStep(3)} />;
  if (step === 3) return <CouponPage user={user} />;
}

export default App;