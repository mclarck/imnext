import React, { useState } from "react";
import style from "./style.module.scss";
import { FiSearch } from "react-icons/fi";

export default function Search({ size, onSearch, onClick = () => {} }) {
  function handle(e: any) {
    onSearch(e.target.value);
  }
  let _className = style.search;
  if (size) _className.concat(" " + style[size]);
  return (
    <div className={_className}>
      <div className={style.control}>
        <input type="text" onChange={handle} />
      </div>
      <button type="button" onClick={onClick} className={style.icon}>
        <FiSearch />
      </button>
    </div>
  );
}
