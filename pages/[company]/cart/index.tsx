import { getSession } from "next-auth/client";
import Head from "next/head";
import React, { useState } from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Billing } from "../../../comp/billing";
import { MainLayout, Modal } from "../../../comp/layout";
import Loader from "../../../comp/loader";
import { Order } from "../../../comp/order";
import { t } from "../../../locale";
import { getCommonProps } from "../../../services/common";
import style from "./style.module.scss";
import useCart from "../../../controllers/useCart";

function AfterOrderMessage({
  isOrderSent,
  onClickMyOrders,
  onClickKeepShopping,
}) {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOrderSent || !isOpen) return <div />;
  function close() {
    setIsOpen(false);
  }
  return (
    <Modal
      onClose={() => {
        close();
        onClickMyOrders();
      }}
      footer={
        <div className={style.footer}>
          <button
            type="button"
            className="btn"
            onClick={() => {
              close();
              onClickKeepShopping();
            }}
          >
            {t("Keep Shopping")}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              close();
              onClickMyOrders();
            }}
          >
            {t("My Orders")}
          </button>
        </div>
      }
    >
      <div className={style.message}>
        <div className={style.title}>{t("Thank you for choosing us")}</div>
        <div className={style.content}>
          {t("Your order has been passed succesfully")}
        </div>
      </div>
    </Modal>
  );
}

export default function Cart({ session, company }) {
  const {
    onClickMyOrders,
    onClickKeepShopping,
    isEmptyCart,
    isOrderSent,
    loading,
    cart,
    bills,
    processPayment,
    remove,
  } = useCart();
  if (loading) return <Loader />;
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
                    onClick={processPayment}
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
        <AfterOrderMessage
          onClickMyOrders={onClickMyOrders}
          onClickKeepShopping={onClickKeepShopping}
          isOrderSent={isOrderSent}
        />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { res, params } = context;
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    res.statusCode = 302;
    res.setHeader("Location", `/${params?.company}/client/login`);
  }
  const props = { ...getCommonProps(context) };
  return {
    props: {
      ...props,
      session: session,
    },
  };
}
