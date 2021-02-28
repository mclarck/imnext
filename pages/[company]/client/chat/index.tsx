import { getSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import ChatBox from "../../../../comp/chatbox/ChatBox";
import { MainLayout } from "../../../../comp/layout";
import { t } from "../../../../locale";
import { getCommonProps } from "../../../../services/common";
import style from "./style.module.scss";
import useChat from "../../../../controllers/useChat";

export default function Chat({ company, session }) {
  const { filterConversation, send, clear, messages } = useChat({
    company,
    session,
    user: session?.user,
  });
  return (
    <MainLayout>
      <Head>
        <title>
          {company} | {t("Profile")} - {session?.user?.name}
        </title>
      </Head>
      <div className={style.Chat}>
        <div className={style.heading}>
          <nav className={style.tabs}>
            <ul>
              <li>
                <Link href={`/${company}/client/chat`}>
                  <a className={style.tab + " " + style.active}>{t("Chat")}</a>
                </Link>
              </li>
              <li>
                <Link href={`/${company}/client/orders`}>
                  <a className={style.tab}>{t("My Orders")}</a>
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
          <ChatBox
            title={`${company}@${t("support")}`}
            messages={filterConversation(messages)}
            onSend={send}
            onClose={clear}
          />
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
