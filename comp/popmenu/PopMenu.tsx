import React from "react";
import usePopMenu from "./usePopMenu";
import style from "./style.module.scss";
import { CgMenuRight } from "react-icons/cg";
import { t } from "../../locale";
import Link from "next/link";

export default function PopMenu() {
  const { show, visible, company, session } = usePopMenu();
  return (
    <div className={style.PopMenu}>
      <button className={style.icon} onClick={show}>
        <CgMenuRight />
      </button>
      {visible && (
        <nav className={style.overlay}>
          <ul className={style.items}>
            {!session && (
              <React.Fragment>
                <li className={style.item}>
                  <Link href={`/market/${company}/client/login`}>
                    <a className={style.link}>{t("Login")}</a>
                  </Link>
                </li>
                <li className={style.item}>
                  <Link href={`/market/${company}/client/register`}>
                    <a className={style.link}>{t("Register")}</a>
                  </Link>
                </li>
              </React.Fragment>
            )}
            {session && (
              <React.Fragment>
                <li className={style.item}>
                  <Link href={`/market/${company}/client/profile`}>
                    <a className={style.link}>{t("Profile")}</a>
                  </Link>
                </li>
                <li className={style.item}>
                  <Link href={`/market/${company}/client/chat`}>
                    <a className={style.link}>{t("Chat")}</a>
                  </Link>
                </li>
                <li className={style.item}>
                  <Link href={`/market/${company}/client/orders`}>
                    <a className={style.link}>{t("My Orders")}</a>
                  </Link>
                </li>
              </React.Fragment>
            )}
            <li className={style.item}>
              <Link href={`/market/${company}/client/help`}>
                <a className={style.link}>{t("Help")}</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
