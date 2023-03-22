import React, { useEffect, useState } from "react";

import classes from "./ConverterRow.module.scss";

const ConverterRow = (props) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (props.data && props.data.rates && !props.isCard)
      setOptions(Object.keys(props.data.rates));
    if (props.isCard)
      setOptions([...localStorage.getItem("currencies").split(",")]);
  }, [props.data, localStorage.getItem("currencies")]);

  return (
    <div className={classes.wrapper}>
      {!props.isCard && (
        <input
          type="number"
          className={classes.input}
          onChange={props.handleVal}
          value={props.value}
        />
      )}
      <select className={classes.select} onChange={props.handleCurrency}>
        {options.map((e) => (
          <option
            key={e}
            value={e}
            className={classes.option}
            selected={e === props.selected}
          >
            {e}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConverterRow;
