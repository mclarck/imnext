import React, { useState } from "react";
import style from "./style.module.scss";
import { FiSearch } from "react-icons/fi";
import { t } from "i18n-js";

export default function Search({
  advanced,
  size,
  onSearch,
  onClick = () => {},
}: {
  advanced?: boolean;
  size?: string;
  onSearch: (key?: any) => void;
  onClick?: () => void;
}) {
  function handle(e: any) {
    let search: string | Array<string> = e.target.value;
    if (advanced) {
      if (search) 
        if (typeof search === "string") search = search.split(":");
    }
    onSearch(search);
  }
  let _className = style.search;
  if (size) _className.concat(" " + style[size]);
  return (
    <div className={_className}>
      <div className={style.control}>
        <input
          type="text"
          onChange={handle}
          placeholder={
            advanced
              ? t("ex: food:pizza")
              : t("Search")
          }
        />
      </div>
      <button type="button" onClick={onClick} className={style.icon}>
        <FiSearch />
      </button>
    </div>
  );
}
