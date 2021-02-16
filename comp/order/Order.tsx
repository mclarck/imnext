import React from "react";
import { MdClose } from "react-icons/md";
import style from "./style.module.scss";

export default function Order() {
  return (
    <div className={style.Order}>
      <div className={style.thumb}>
        <img src="https://api.inmarketify.ml/public/uploads/medias/kioskito/d570c19f-5dc8-4564-94bf-4684d3faab9a.png" />
      </div>
      <div className={style.infos}>
        <div className={style.title}>Specie Name</div>
        <div className={style.description}>
          Some description about th product
        </div>
      </div>
      <div className={style.quantity}>
        <span>x</span>
        <span className={style.amount}>5</span>
      </div>
      <div className={style.actions}>
        <button type="button" className={style.close}>
          <MdClose />
        </button>
      </div>
    </div>
  );
}
