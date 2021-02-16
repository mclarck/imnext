import React, { useState } from "react";
import style from "./style.module.scss";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function Incrementor({ onChange, limit = 99 }) {
  const [inc, setinc] = useState<number>(0);
  const increment = () => {
    if (limit && limit > 0) {
      if (inc < limit) {
        const nextInc = inc + 1;
        setinc(nextInc);
        onChange(nextInc);
      }
    } else {
      const nextInc = inc + 1;
      setinc(nextInc);
      onChange(nextInc);
    }
  };
  const decrement = () => {
    if (inc > 0) {
      const nextInc = inc - 1;
      setinc(nextInc);
      onChange(nextInc);
    }
  };
  const handle = (e: any) => {
    const inc = parseInt(e?.target?.value);
    if (inc > 0 && inc <= limit) {
      setinc(inc);
      onChange(inc)
    }
  };
  return (
    <div className={style.Incrementor}>
      <button type="button" className={style.right} onClick={decrement}>
        <FaChevronLeft />
      </button>
      <div className={style.input}>
        <input
          type="text"
          value={inc}
          onBlur={handle}
          onChange={handle}
        />
      </div>
      <button type="button" className={style.left} onClick={increment}>
        <FaChevronRight />
      </button>
    </div>
  );
}
