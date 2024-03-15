import React, { useState } from 'react';
import axios from 'axios';

function PaymentProcess() {
  const handleOnUpgrade = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/payment/midtrans/initiate', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      });

      window.snap.pay(data.transactionToken, {
        onSuccess: async function(result) {
          alert('Payment success!');
          console.log(result);
          await axios.patch('http://localhost:3000/users/me/upgrade', {
            orderId: data.orderId
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
          });
        }
      });
    } catch (error) {
      console.error('Error handling upgrade:', error);
    }
  };

  return (
    <div>
      <button onClick={handleOnUpgrade}>Upgrade Now</button>
    </div>
  );
}

export default PaymentProcess;