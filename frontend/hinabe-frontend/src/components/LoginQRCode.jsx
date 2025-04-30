// src/components/LoginQRCode.jsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';  // ← デフォルトではなく named export

const LoginQRCode = () => {
  // スマホからアクセス可能な URL を指定
  const loginUrl = 'http://192.168.1.7:5173/';

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>ログインページへスキャン</h2>
      <QRCodeSVG
        value={loginUrl}
        size={200}
        marginSize={10}      // includeMargin は廃止 → marginSize に変更
      />
      <p>スマホでこの QR コードをスキャンしてください</p>
    </div>
  );
};

export default LoginQRCode;