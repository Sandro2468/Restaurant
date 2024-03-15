/* eslint-disable react/prop-types */
// import Card from '../components/Card'
import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [quantity, setQuantity] = useState({
    quantity: 0,
  });

  function handleInputQuantity(event) {
    const { name, value } = event.target;
    setQuantity({
      ...quantity,
      [name]: Number(value),
    });
  }

  const getDataFunc = async () => {
    try {
      const res = await axios(`http://localhost:3000/menus/${id}`, {
        method: "GET",
        headers: {
          access_token: `${localStorage.getItem("access_token")}`,
        },
      });
      setData(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFunc();
  }, []);

  const PayOnclick = async () => {
    try {
      const res = await axios(`http://localhost:3000/ordersPayment/${id}`, {
        method: "POST",
        data: {
          quantity: quantity.quantity,
        },
        headers: {
          access_token: `${localStorage.getItem("access_token")}`,
        },
      });
      console.log(res);

      window.snap.pay(res?.data?.token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          navigate("/");
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = "SB-Mid-client-deMdE7feRCOuQRwS";
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <Navbar />
      <button
        className="mt-20 bg-red-500 text-white px-4 py-2 rounded-md shadow-md"
        onClick={PayOnclick}
      >
        Bayar
      </button>

      <div className="mt-10 text-black">{data?.category}</div>
      <div className="text-black">{data?.description}</div>
      <div className="text-black">Rp. {data?.price}</div>
      <div className="text-black">Item Stock: {data?.itemStock}</div>
      <div className="mt-5">
        <label
          htmlFor="quantity"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Jumlah
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Masukkan Jumlah Yang Ingin Dibeli"
          onChange={handleInputQuantity}
          required
        />
      </div>
    </>
  );
}

export default DetailPage;
