import moment from "moment";
import { getSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { RiCloseCircleFill } from "react-icons/ri";
import { MainLayout } from "../../../../comp/layout";
import Loader from "../../../../comp/loader";
import { Order } from "../../../../comp/order";
import { OrderState } from "../../../../comp/orderstate";
import { locale, t } from "../../../../locale";
import { getCommonProps } from "../../../../services/common";
import style from "./style.module.scss";
import useOrders from "./useOrders";

export default function Orders({ company, session }) {
  const { orderState, cancelOrder, client, carts, loading } = useOrders({
    session,
    company,
  });
  if (loading) return <Loader />;
  return (
    <MainLayout>
      <Head>
        <title>
          {company} | Profile - {session?.user?.name}
        </title>
      </Head>
      <div className={style.Orders}>
        <div className={style.heading}>
          <nav className={style.tabs}>
            <ul>
              <li>
                <Link href={`/${company}/client/chat`}>
                  <a className={style.tab}>{t("Chat")}</a>
                </Link>
              </li>
              <li>
                <Link href={`/${company}/client/orders`}>
                  <a className={style.tab + " " + style.active}>
                    {t("My Orders")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${company}/client/profile`}>
                  <a className={style.tab}>{t("Account")}</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.body}>
          {carts?.map((o, index) => {
            const cart = o.node?.orders?.edges;
            const transac = o.node;
            if (
              !["active", "shipping", "arrived", "canceled"].includes(
                transac.status
              )
            ) {
              return null;
            }
            return (
              <React.Fragment key={index}>
                <div className={style.cart}>
                  <div className={style.infos}>
                    {t("Transaction id")}: 00{transac._id}
                  </div>
                  <div className={style.location}>
                    {t("Deliver to")} {client?.username}, {t("apt")}{" "}
                    {client?.address?.apt} {client?.address?.street}{" "}
                    {client?.address?.number}
                  </div>
                  <div className={style.date}>
                    <div className={style.icon}>
                      <BiCalendarEvent />
                    </div>
                    <div>
                      {moment(transac.created).locale(locale).calendar()}
                    </div>
                  </div>
                  <div className={style.items}>
                    {cart?.map((order, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <Order order={order.node} />
                        </React.Fragment>
                      );
                    })}
                    <div className={style.billing}>
                      <span className={style.label}>{t("Amount to pay")}</span>
                      <span className={style.currency}>$</span>
                      <span className={style.amount}>{transac.amount}</span>
                    </div>
                    <OrderState
                      style={style.states}
                      active={orderState}
                      states={[
                        { state: "active", label: t("Preparing") },
                        { state: "shipping", label: t("On way") },
                        { state: "arrived", label: t("Arrived") },
                        { state: "canceled", label: t("Canceled") },
                      ]}
                    />
                    <div className={style.actions}>
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => cancelOrder(transac)}
                      >
                        <div>{t("Cancel")}</div>
                        <div className={style.icon}>
                          <RiCloseCircleFill />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { res, params } = context;
  const session = await getSession(context);
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
