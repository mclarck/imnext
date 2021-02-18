import Head from "next/head";
import useClient from "../useClient";
import style from "./style.module.scss";
import React from "react";
import Loader from "../../../../comp/loader";
import { MdPerson } from "react-icons/md";
import { BsShieldLock } from "react-icons/bs";
import Link from "next/link";
import Field from "../../../../comp/field";
import ReCAPTCHA from "react-google-recaptcha";
import { csrfToken, getSession, providers, signIn } from "next-auth/client";

export default function Login({ session, csrfToken, recaptchaKey, providers }) {
  const {
    t,
    replace,
    company,
    error,
    loading,
    handleSubmit,
    login,
    register,
    recaptcha,
  } = useClient();
  return (
    <div className={style.Login}>
      <Head>
        <title>Client - Login</title>
      </Head>
      <div className={style.login}>
        <form className={style.form} onSubmit={handleSubmit(login)}>
          <input
            name="csrfToken"
            type="hidden"
            ref={register}
            defaultValue={csrfToken}
          />
          {Object.values(providers).map((provider: any) => {
            if ([""].includes(provider.name)) {
              return (
                <div key={provider.name} className={style.field}>
                  <button
                    type="button"
                    className="btn btn-social-login"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              );
            }
          })}
          <div className={style.field}>
            <Field
              label={t("Username or Email")}
              error={error?.login}
              iconRight={<MdPerson />}
            >
              <input type="text" ref={register} name="login" />
            </Field>
          </div>
          <div className={style.field}>
            <Field
              label={t("PIN")}
              error={error?.pin}
              iconRight={<BsShieldLock />}
            >
              <input type="password" ref={register} name="pin" />
            </Field>
          </div>
          <div className={style.field}>
            <Link href={`/${company}/client/help`}>
              <a className="btn btn-link btn-right">{t("Forget your PIN ?")}</a>
            </Link>
          </div>
          <div className={style.submit}>
            <button type="submit" className="btn btn-flex btn-primary">
              {t("Login")}
            </button>
          </div>
          <div className={style.submit}>
            <Link
              href={`/[company]/client/register`}
              as={`/${company}/client/register`}
            >
              <a className="btn">{t("Register")}</a>
            </Link>
          </div>
          <ReCAPTCHA
            ref={recaptcha}
            badge="bottomright"
            size="invisible"
            sitekey={recaptchaKey}
          />
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { res, params } = context;
  const session = await getSession(context);
  if (session) {
    res.statusCode = 302;
    res.setHeader("Location", `/${params?.company}`);
  }
  return {
    props: {
      session: session,
      providers: await providers(),
      csrfToken: await csrfToken(context),
      recaptchaKey: process.env.RECAPTCHA_PUBLIC_KEY,
      rest: {
        uri: process.env.API_REST_URL,
      },
    },
  };
}
