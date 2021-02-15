import React from "react";
import { Tag } from "../tag";
import style from "./style.module.scss"; 

export default function TagList() {
  return (
    <ul className={style.TagList}>
      <li className={style.tag}>
        <Tag name="Cerveza" />
      </li>
      <li className={style.tag}>
        <Tag name="Ron" />
      </li>
      <li className={style.tag}>
        <Tag name="Comida" />
      </li>
      <li className={style.tag}>
        <Tag name="No Se que" />
      </li>
      <li className={style.tag}>
        <Tag name="Otra Cosa" />
      </li>
      <li className={style.tag}>
        <Tag name="Bebidas" />
      </li>
    </ul>
  );
}
