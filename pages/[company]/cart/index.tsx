import { divide } from "lodash";
import Head from "next/head";
import React from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Billing } from "../../../comp/billing";
import { MainLayout } from "../../../comp/layout";
import Loader from "../../../comp/loader";
import { Order } from "../../../comp/order";
import { t } from "../../../locale";
import style from "./style.module.scss";
import useCart from "./useCart";

export default function Cart() {
  const {
    session,
    isEmptyCart,
    replace,
    loading,
    company,
    cart,
    bills,
    pay,
    remove,
  } = useCart();
  if (loading) return <Loader />;
  console.log(session);
  if (!session) {
    replace(`/${company}/client/login`);
    return null;
  }
  return (
    <MainLayout>
      <Head>
        <title>
          {company} | Cart - {session?.user?.name}
        </title>
      </Head>
      <div className={style.Cart}>
        <div className={style.content}>
          {!isEmptyCart && (
            <React.Fragment>
              <div className={style.cart}>
                <div className={style.items}>
                  {cart?.map((order, idx) => (
                    <Order key={idx} order={order} remove={remove} />
                  ))}
                </div>
              </div>
              <div className={style.billing}>
                <div className={style.bill}>
                  <Billing bills={bills} />
                </div>
                <div className={style.payment}>
                  <button
                    type="button"
                    onClick={pay}
                    className="btn btn-success"
                  >
                    {t("Pay on delivery")}
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
          {isEmptyCart && (
            <div className={style.empty}>
              <div className={style.message}> 
                <div className={style.icon}>
                  <MdRemoveShoppingCart />
                </div>
                <div>{t("Empty Cart")}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

Cart.getInitialProps = async (context) => {
  return {};
};
