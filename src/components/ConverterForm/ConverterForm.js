import React, { useEffect, useState } from "react";
import ConverterRow from "../ConverterRow/ConverterRow";

import classes from "./ConverterForm.module.scss";

import exchange from "../../assets/exchange.png";

const ConverterForm = (props) => {
  const [val1, setVal1] = useState(null);
  const [val2, setVal2] = useState(null);

  const handleVal1 = (e) => {
    if (!e.target.value) {
      setVal1("");
      setVal2("");
      return;
    }
    if (e.target.value * props.data.rates["USD"] > 10000) {
      setVal1(10000);
      setVal2(10000 * props.data.rates[props.currency2]);
      return;
    }
    setVal1(e.target.value);
    setVal2(e.target.value * props.data.rates[props.currency2]);
  };
  const handleVal2 = (e) => {
    if (!e.target.value) {
      setVal1("");
      setVal2("");
      return;
    }

    if (
      (e.target.value / props.data.rates[props.currency2]) *
        props.data.rates["USD"] >
      10000
    ) {
      // setVal1(10000 / props.data.rates["USD"]);
      return;
    }

    setVal2(e.target.value);
    setVal1(e.target.value / props.data.rates[props.currency2]);
  };

  useEffect(() => {
    if (props.data.rates)
      setVal2((prev) => prev * props.data.rates[props.currency2]);
  }, [props.currency1]);

  useEffect(() => {
    if (props.data.rates)
      setVal1((prev) => prev / props.data.rates[props.currency2]);
  }, [props.currency2]);

  return (
    <form className={classes.form}>
      <h2 className={classes.header}>Convert your currency</h2>
      <ConverterRow
        data={props.data}
        handleCurrency={props.handleCurrency1}
        handleVal={handleVal1}
        value={val1}
        selected="USD"
      />
      <img src={exchange} alt="convert" className={classes.exchange} />
      <ConverterRow
        data={props.data}
        handleCurrency={props.handleCurrency2}
        handleVal={handleVal2}
        value={val2}
        selected="BTC"
      />
    </form>
  );
};

export default ConverterForm;
