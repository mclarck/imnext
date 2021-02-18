import { getSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Check from "../../../../comp/form/check";
import {
  ContactField,
  LocationField,
  PersonalField,
} from "../../../../comp/form/fields";
import { MainLayout } from "../../../../comp/layout";
import { t } from "../../../../locale";
import style from "./style.module.scss";
import useProfile from "./useProfile";

export default function Profile({ company, session }) {
  const {
    user,
    location,
    error,
    loading,
    register,
    handleSubmit,
    submit,
  } = useProfile(session);
  return (
    <MainLayout>
      <Head>
        <title>
          {company} | Profile - {session?.user?.name}
        </title>
      </Head>
      <div className={style.Profile}>
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
                  <a className={style.tab}>{t("My Orders")}</a>
                </Link>
              </li>
              <li>
                <Link href={`/${company}/client/profile`}>
                  <a className={style.tab + " " + style.active}>
                    {t("Account")}
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.body}>
          <form onSubmit={handleSubmit(submit)}>
            <input
              type="hidden"
              name="id"
              ref={register}
              defaultValue={user?.id}
            />
            <PersonalField
              register={register}
              style={style}
              defaultValue={user}
            />
            <ContactField
              error={error}
              defaultValue={user}
              register={register}
              style={style}
            />
            <LocationField
              error={error}
              register={register}
              style={style}
              defaultValue={{
                ...user,
                address: {
                  ...user?.address,
                  location: location || user?.address?.location,
                },
              }}
            />
            <div className={style["grid-2"]}>
              <div>
                <Check
                  label="Yes, I want to receive specials offers"
                  name="offer"
                  register={register}
                />
              </div>
              <div className={style.submit}>
                <button type="submit" className="btn btn-flex btn-primary">
                  {t("Update")}
                </button>
              </div>
            </div>
          </form>
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
  return {
    props: {
      company: params.company,
      session: session,
      rest: {
        uri: process.env.API_REST_URL,
        headers: { "IM-COMPANY": params?.company },
      },
      graphql:{
        uri: process.env.API_GRAPHQL_URL,
        headers: { "IM-COMPANY": params?.company },
      }
    },
  };
}
