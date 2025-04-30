// src/components/CouponPage.jsx
import React from 'react';
import { drawCoupon } from '../api';

const CouponPage = ({ user, onLogout }) => {
  const handleDraw = async () => {
    try {
      const res = await drawCoupon(user.phoneNum);
      const { message, coupon } = res.data;

      // メッセージとクーポン情報を表示
      alert(`${message}\n\nクーポン名: ${coupon.name}\n説明: ${coupon.description}`);

      // 抽選後はログアウト＆リロード（Appの初期化へ）
      onLogout();
      setTimeout(() => window.location.reload(), 100);

    } catch (err) {
      console.error("抽選エラー:", err);
      alert("抽選に失敗しました");
    }
  };

  return (
    <div>
      <h2>クーポン抽選</h2>
      <button onClick={handleDraw}>抽選する</button>
    </div>
  );
};

export default CouponPage;