import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import ConverterForm from "./components/ConverterForm/ConverterForm";
import CurrenciesCard from "./components/CurrenciesCard/CurrenciesCard";
import Modal from "./components/Modal/Modal";

function App() {
  // const [currenciesData, setCurrenciesData] = useState(null);

  const initialOptions = ["USD", "EUR", "UAH", "BTC"];

  const [currenciesData, setCurrenciesData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("BTC");
  const [isModal, setIsModal] = useState(false);

  if (localStorage.getItem("currencies")) {
  } else localStorage.setItem("currencies", ["USD", "UAH", "BTC"]);

  const handleCurrency1 = (e) => {
    setCurrency1(e.target.value);
  };
  const handleCurrency2 = (e) => {
    setCurrency2(e.target.value);
  };
  const handleModal = () => {
    setIsModal((prev) => !prev);
  };

  const getData = async (isCard, val) => {
    const res = await fetch(
      isCard
        ? `https://api.apilayer.com/exchangerates_data/latest&base=${val}&symbol=${currency2}`
        : `https://api.apilayer.com/exchangerates_data/latest&base=${currency1}&symbol=${currency2} `,
      {
        method: "get",
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!isCard) setCurrenciesData(data);

    if (isCard) setCardData(data);

    // console.log(res);
    // console.log(data);
  };

  useEffect(() => {
    getData();
  }, [currency1, currency2]);

  return (
    <div className={classes.App}>
      <ConverterForm
        data={currenciesData}
        handleCurrency1={handleCurrency1}
        handleCurrency2={handleCurrency2}
        currency1={currency1}
        currency2={currency2}
      />
      <CurrenciesCard getData={getData} data={cardData} />

      <button className={classes["btn-choose"]} onClick={handleModal}>
        Choose currencies
      </button>

      {isModal && <Modal data={currenciesData} handleModal={handleModal} />}
    </div>
  );
}

export default App;
