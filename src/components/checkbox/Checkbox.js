import React from "react";

import classes from "./Checkbox.module.scss";

const Checkbox = (props) => {
  const handleCheck = (val) => {
    props.handleCheck(val);
  };

  return (
    <div
      className={`${classes.wrapper} ${props.isChecked ? classes.checked : ""}`}
      onClick={handleCheck}
    >
      {props.isChecked && (
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.38765 8.90353L14.1937 0L15.2009 1.14883L6.44887 11.1314L6.44797 11.1303L6.38673 11.2002L0.800781 4.82854L1.80797 3.67969L6.38765 8.90353Z"
            fill="#00DA09"
          />
        </svg>
      )}
    </div>
  );
};

export default Checkbox;
