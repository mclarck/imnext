import React from "react";
import style from "./style.module.scss";

export type OrderStateProps = {
  states?: Array<{ state: string; label?: string }>;
  active?: string;
  style?: any;
};

const OrderState = (props: OrderStateProps) => {
  return (
    <div className={style.orderState + " " + props.style || ""}>
      <ul className={style.states}>
        {props.states?.map((o, idx: number) => (
          <li
            key={idx}
            className={o.state === props.active ? style.active : ""}
          >
            <span>{o.label || o.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderState;
