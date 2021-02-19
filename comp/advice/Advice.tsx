import React, { useState } from "react";
import { t } from "../../locale";
import { Modal } from "../layout";
import style from "./style.module.scss";

export default function Advice() {
  const [isOpen, open] = useState(true);
  if (!isOpen) return <div />;
  return (
    <Modal
      onClose={() => open(false)}
      footer={
        <div className={style.footer}>
          <button type="button" className="btn" onClick={() => open(false)}>
            {t("I understand")}
          </button>
        </div>
      }
    >
      <div className={style.Advice}> 
        <div className={style.message}>
          <div className={style.title}>{t("Important announcement")}</div>
          <div className={style.content}>{t(`minor advice`)}</div>
        </div>
      </div>
    </Modal>
  );
}
