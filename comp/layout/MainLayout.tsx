import React from "react";
import { TopBar } from "../topbar";
import style from "./style.module.scss";

export default function MainLayout({ children, company }) {
  return (
    <div className={style.mainLayout}>
      <TopBar company={company} />
      <div id={style.content}>{children}</div>
    </div>
  );
}
