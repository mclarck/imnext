import Head from "next/head";
import useClient from "./useClient";
import style from "./style.module.scss";
import React from "react";
import Loader from "../../comp/loader";
import { MdPerson, MdPhone } from "react-icons/md";
import { BsShieldLock } from "react-icons/bs";
import Link from "next/link";
import Field from "../../comp/field";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login(props) {
  const {
    t,
    error, 
    loading,
    handleSubmit,
    submit,
    register,
    recaptcha,
  } = useClient();

  return (
    <div className={style.Login}>
      <Head>
        <title>Client - Login</title>
      </Head>
      <div className={style.login}>
        <form className={style.form} onSubmit={handleSubmit(submit)}>
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
            <Link href="/client/help">
              <a className="btn btn-link btn-right">{t("Forget your PIN ?")}</a>
            </Link>
          </div>
          <div className={style.submit}>
            <button type="submit" className="btn btn-flex btn-primary">
              {t("Login")}
            </button>
          </div>
          <div className={style.submit}>
            <Link href="/client/register">
              <a className="btn">{t("Register")}</a>
            </Link>
          </div>
          <ReCAPTCHA
            ref={recaptcha}
            badge="bottomright"
            size="invisible"
            sitekey={props.recaptchaKey}
          />
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      recaptchaKey: process.env.RECAPTCHA_PUBLIC_KEY,
    },
  };
}