import React from "react";
import style from "./style.module.scss";
import { FiSearch } from "react-icons/fi";
import { PopMenu } from "../popmenu";
import Link from "next/link";
import { BiCartAlt } from "react-icons/bi";
import useToBar from "./useTopbar";

export default function TopBar() {
  const { cartSize, cartIsEmpty, company } = useToBar();
  return (
    <nav className={style.topBar}>
      <ul>
        <li>
          <Link href={`/${company}`}>
            <a className={style.brand}>{company}</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href={`/${company}`}>
            <a className={style.link}>
              <FiSearch />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/${company}/cart`}>
            <a className={style.link}>
              <BiCartAlt />
              {!cartIsEmpty && <span className={style.badge}>{cartSize}</span>}
            </a>
          </Link>
        </li>
        <li>
          <PopMenu />
        </li>
      </ul>
    </nav>
  );
}
