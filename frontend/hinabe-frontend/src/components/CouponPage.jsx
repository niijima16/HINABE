import React, { useState } from 'react';
import { drawCoupon } from '../api';

const CouponPage = ({ user }) => {
  const [result, setResult] = useState(null);

  const handleDraw = async () => {
    const res = await drawCoupon(user.phoneNum);
    setResult(res.data);
  };

  return (
    <div>
      <h2>クーポン抽選</h2>
      <button onClick={handleDraw}>抽選する</button>
      {result && (
        <div>
          <p>{result.message}</p>
          {result.coupon && <p>当選: {result.coupon.name}</p>}
        </div>
      )}
    </div>
  );
};

export default CouponPage;