import React, { useEffect, useState } from "react";
import ConverterRow from "../ConverterRow/ConverterRow";
import classes from "./CurrenciesCard.module.scss";

import refresh from "../../assets/refresh.png";

const CurrenciesCard = (props) => {
  const [currency, setCurrency] = useState("USD");
  const [isRefresh, setIsRefresh] = useState(true);

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const handleRefresh = (e) => {
    if (!isRefresh) return;

    setIsRefresh(false);
    setTimeout(() => {
      setIsRefresh(true);
    }, 5000);
  };

  useEffect(() => {
    props.getData(true, currency);
  }, [currency]);

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.header}>
        <span>Other currencies</span>

        <img
          src={refresh}
          alt="refresh"
          onClick={handleRefresh}
          className={`${classes.refresh} ${!isRefresh ? classes.disabled : ""}`}
        />
      </h2>
      <ConverterRow
        handleCurrency={handleCurrency}
        selected="USD"
        isCard={true}
        currency={currency}
      />
      {props.data.rates && (
        <div className={classes.results}>
          {Object.keys(props.data.rates)
            .filter((e) =>
              [...localStorage.getItem("currencies").split(",")].includes(e)
            )
            .filter((e) => e !== currency)
            .map((k, i) => (
              <li className={classes["list-item"]} key={i}>
                <span className={classes.item}>
                  {k} : {props.data.rates[k]}
                </span>
              </li>
            ))}
        </div>
      )}
    </div>
  );
};

export default CurrenciesCard;
