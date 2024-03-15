/* eslint-disable react/prop-types */
import Card from "../components/Card";
import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [data, setData] = useState();

  const getDataFunc = async () => {
    try {
      const res = await axios("http://localhost:3000/menus", {
        method: "GET",
        headers: {
          access_token: `${localStorage.getItem("access_token")}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFunc();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 gap-4">
        {data?.map((el) => {
          return <Card menu={el} />;
        })}
      </div>
    </>
  );
}

export default Home;
