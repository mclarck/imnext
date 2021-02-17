import Head from "next/head";
import style from "./style.module.scss";
import React from "react";
import { MdLocationOn, MdMail, MdPerson, MdPhone } from "react-icons/md";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { BsShieldLock } from "react-icons/bs";
import useClient from "../useClient";
import Check from "../../../../comp/check";
import Field from "../../../../comp/field";
import Loader from "../../../../comp/loader";
import { csrfToken } from "next-auth/client";

export default function Register({ recaptchaKey, csrfToken }) {
  const {
    t,
    company,
    error,
    resetAddress,
    loading,
    handleSubmit,
    registration,
    register,
    recaptcha,
    handleTos,
    handleOffer,
  } = useClient();

  return (
    <div className={style.Register}>
      <Head>
        <title>Client - Registration</title>
      </Head>
      <div className={style.register}>
        <form className={style.form} onSubmit={handleSubmit(registration)}>
          <input
            name="csrfToken"
            type="hidden"
            ref={register}
            defaultValue={csrfToken}
          />
          <div className={style.field}>
            <Field
              label={t("Username")}
              error={error?.username}
              iconRight={<MdPerson />}
            >
              <input type="text" name="username" ref={register} />
            </Field>
          </div>
          <div className={`${style.field} ${style["grid-2"]}`}>
            <Field label={t("Email")} iconRight={<MdMail />}>
              <input type="text" name="email" ref={register} />
            </Field>
            <Field label={t("Phone")} iconRight={<MdPhone />}>
              <input type="text" name="phone" ref={register} />
            </Field>
          </div>
          <div className={`${style.field} ${style["grid-2"]}`}>
            <Field label={t("PIN")} iconRight={<BsShieldLock />}>
              <input type="password" name="pin" ref={register} />
            </Field>
            <Field label={t("Confirm PIN")} iconRight={<BsShieldLock />}>
              <input type="password" name="vpin" ref={register} />
            </Field>
          </div>
          <div className={style.field}>
            <Field
              label={t("Street")}
              iconRight={<MdLocationOn />}
              error={error?.address?.street}
            >
              <input
                type="text"
                name="address.street"
                ref={register}
                onBlur={resetAddress}
              />
            </Field>
          </div>
          <div className={`${style.field} ${style["grid-3"]}`}>
            <Field label={t("Street Number")}>
              <input
                type="text"
                name="address.number"
                ref={register}
                onBlur={resetAddress}
              />
            </Field>
            <Field label={t("Apt")}>
              <input
                type="text"
                name="address.apt"
                ref={register}
                onBlur={resetAddress}
              />
            </Field>
            <Field label={t("City")}>
              <input
                type="text"
                defaultValue="CABA, Argentina"
                name="address.city"
                readOnly
                ref={register}
              />
            </Field>
          </div>
          <div className={style["grid-2"]}>
            <div>
              <Check
                title="Yes, I accept Terms of Services"
                onAccept={handleTos}
              />
              <Check
                title="Yes, I want to receive specials offers"
                onAccept={handleOffer}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-flex btn-primary">
                {t("Register")}
              </button>
            </div>
          </div>
          <br />
          <div className={style.submit}>
            <Link
              href={`/[company]/client/login`}
              as={`/${company}/client/login`}
            >
              <a className="btn">
                {t("Already have an account?")}, {t("Login")}
              </a>
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
  return {
    props: {
      csrfToken: await csrfToken(context),
      recaptchaKey: process.env.RECAPTCHA_PUBLIC_KEY,
      rest: {
        uri: process.env.API_REST_URL,
      },
    },
  };
}
