import React from "react";
import style from "./style.module.scss";
import { FiAlertCircle, FiSearch } from "react-icons/fi";
import { PopMenu } from "../popmenu";
import Link from "next/link";
import { BiCartAlt } from "react-icons/bi";

export default function TopBar({ company }) {
  return (
    <nav className={style.topBar}>
      <ul>
        <li>
          <Link href={`/market/${company}`}>
            <a className={style.brand}>{company}</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href={`/market/${company}`}>
            <a className={style.link}>
              <FiSearch />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/market/${company}/cart`}>
            <a className={style.link}>
              <BiCartAlt />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/market/${company}/infos`}>
            <a className={style.link}>
              <FiAlertCircle />
            </a>
          </Link>
        </li>
        <li>
          <PopMenu company={company} />
        </li>
      </ul>
    </nav>
  );
}
