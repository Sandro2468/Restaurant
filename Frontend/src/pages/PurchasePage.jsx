import { useState } from "react";
import axios from "axios";

function PurchasePage() {
  const [quantity, setQuantity] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [transactionToken, setTransactionToken] = useState("");


  const handlePurchase = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/payment/midtrans/initiate",
        {
          quantity,
          paymentAmount,
        }
      );
      const { data } = response;
      setTransactionToken(data.transactionToken);
      setOrderId(data.orderId);
    } catch (error) {
      console.error("Error purchasing:", error);
    }
  };

  // Fungsi untuk memperbarui status pembayaran setelah pembayaran berhasil
  const handlePaymentSuccess = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/payment/update",
        {
          orderId,
          transactionStatus: "Success",
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div>
      <h1>Purchase Page</h1>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <label htmlFor="paymentAmount">Payment Amount:</label>
      <input
        type="number"
        id="paymentAmount"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
      />
      <button onClick={handlePurchase}>Purchase</button>
      {transactionToken && (
        <div>
          <h2>Payment Process</h2>
          <p>Click the button below to proceed with payment</p>
          <button
            onClick={() =>
              window.snap.pay(transactionToken, {
                onSuccess: handlePaymentSuccess,
              })
            }
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default PurchasePage;
