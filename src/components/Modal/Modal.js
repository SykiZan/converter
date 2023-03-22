import React, { useEffect, useState } from "react";

import classes from "./Modal.module.scss";

import Checkbox from "../checkbox/Checkbox";

import close from "../../assets/close.png";

const Modal = (props) => {
  const [selected, setSelected] = useState([
    ...localStorage.getItem("currencies").split(","),
  ]);

  const handleCheck = (val) => {
    if (!selected.includes(val)) {
      setSelected((prev) => [...prev, val]);
    } else {
      const pos = selected.indexOf(val);
      const arr = [...selected];

      arr.splice(pos, 1);
      setSelected(arr);
    }
  };

  useEffect(() => {
    localStorage.setItem("currencies", selected);
  }, [selected]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.backdrop} onClick={props.handleModal}></div>
      <div className={classes.modal}>
        <img
          src={close}
          alt="close"
          className={classes.close}
          onClick={props.handleModal}
        />
        <h2>Selected currencies</h2>
        {props.data.rates && (
          <div className={classes.checks}>
            {Object.keys(props.data.rates).map((k, i) => (
              <div key={k} className={classes["check-wrap"]}>
                <Checkbox
                  isChecked={selected.includes(k)}
                  handleCheck={() => {
                    handleCheck(k);
                  }}
                />
                <span className={classes["check-val"]}>{k}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
