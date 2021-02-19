import React from "react";
import { MdClose } from "react-icons/md";
import { fileUrl } from "../../lib/ultils";
import style from "./style.module.scss";

export default function Order({
  order,
  remove,
}: {
  order: any;
  remove?: Function;
}) {
  const stock = order?.stock || {};
  return (
    <div className={style.Order}>
      <div className={style.thumb}>
        <img data-iri={stock?.file?.id} src={fileUrl(stock?.file)} />
      </div>
      <div className={style.infos}>
        <div className={style.title}>{stock.product?.specie}</div>
        <div className={style.description}>
          <div>{stock?.product?.mark}</div>
          <div>
            {stock?.product?.variety} {stock?.product?.container}
          </div>
        </div>
      </div>
      <div className={style.quantity}>
        <span>x</span>
        <span className={style.amount}>{order?.quantity}</span>
      </div>
      <div className={style.actions}>
        {remove && (
          <button
            type="button"
            className={style.close}
            onClick={() => remove(order)}
          >
            <MdClose />
          </button>
        )}
      </div>
    </div>
  );
}
