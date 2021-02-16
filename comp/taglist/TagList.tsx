import React from "react";
import { Tag } from "../tag";
import style from "./style.module.scss";
import { useRouter } from "next/router";

export default function TagList() {
  const {
    query: { company },
  } = useRouter();
  return (
    <ul className={style.TagList}>
      <li className={style.tag}>
        <Tag name="Cerveza" path={`/market/${company}`} />
      </li>
      <li className={style.tag}>
        <Tag name="Ron" path={`/market/${company}`} />
      </li>
      <li className={style.tag}>
        <Tag name="Comida" path={`/market/${company}`} />
      </li>
      <li className={style.tag}>
        <Tag name="No Se que" path={`/market/${company}`} />
      </li>
      <li className={style.tag}>
        <Tag name="Otra Cosa" path={`/market/${company}`} />
      </li>
      <li className={style.tag}>
        <Tag name="Bebidas" path={`/market/${company}`} />
      </li>
    </ul>
  );
}
