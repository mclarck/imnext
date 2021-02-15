import React from "react";
import usePopMenu from "./usePopMenu";
import style from "./style.module.scss";
import { CgMenuRight } from "react-icons/cg";
import { t } from "../../locale";
import Link from "next/link";

export default function PopMenu({ company }) {
  const { show, visible } = usePopMenu();
  return (
    <div className={style.PopMenu}>
      <button className={style.icon} onClick={show}>
        <CgMenuRight />
      </button>
      {visible && (
        <nav className={style.overlay}>
          <ul className={style.items}>
            <li className={style.item}>
              <Link href={`/client/login`}>
                <a className={style.link}>{t("Login")}</a>
              </Link>
            </li>
            <li className={style.item}>
              <Link href={`/client/register`}>
                <a className={style.link}>{t("Register")}</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
