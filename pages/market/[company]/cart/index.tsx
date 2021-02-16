import Head from "next/head";
import React from "react";
import { Billing } from "../../../../comp/billing";
import { MainLayout } from "../../../../comp/layout";
import { Order } from "../../../../comp/order";
import { t } from "../../../../locale";
import style from "./style.module.scss";
import useCart from "./useCart";

export default function Cart() {
  const { company, cart, bills, pay, remove } = useCart();
  return (
    <MainLayout company={company}>
      <Head>
        <title>{company} | Cart - Client Name</title>
      </Head>
      <div className={style.Cart}>
        <div className={style.content}>
          <div className={style.cart}>
            <div className={style.items}>
              {cart?.map((order, idx) => {
                return <Order key={idx} />;
              })}
            </div>
          </div>
          <div className={style.billing}>
            <div className={style.bill}>
              <Billing bills={bills} />
            </div>
            <div className={style.payment}>
              <button type="button" onClick={pay} className="btn btn-success">
                {t("Pay on delivery")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
