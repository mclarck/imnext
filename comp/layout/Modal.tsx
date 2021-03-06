import React, { Children } from "react";
import style from "./style.module.scss";
import { MdClose } from "react-icons/md"; 

export default function Modal({
  children,
  onClose,
  footer,
}: {
  children: any;
  onClose?: Function;
  footer?: any;
}) {
  function handleClick() {
    onClose && onClose();
  }
  return (
    <div className={style.Modal}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.actions}>
            <button type="button" onClick={handleClick} className={style.close}>
              <MdClose />
            </button>
          </div>
        </div>
        <div className={style.body}>{children}</div>
        {footer && <div className={style.footer}>{footer}</div>}
      </div>
    </div>
  );
}
