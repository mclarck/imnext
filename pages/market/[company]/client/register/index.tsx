import Head from "next/head";
import useClient from "./useClient";
import style from "./style.module.scss";
import React from "react";
import Loader from "../../../../comp/loader";
import { MdLocationOn, MdMail, MdPerson, MdPhone } from "react-icons/md";
import Link from "next/link";
import Field from "../../../../comp/field";
import Check from "../../../../comp/check";
import ReCAPTCHA from "react-google-recaptcha";
import { BsShieldLock } from "react-icons/bs";

export default function Register(props) {
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
    handleOffer
  } = useClient();

  return (
    <div className={style.Register}>
      <Head>
        <title>Client - Registration</title>
      </Head>
      <div className={style.register}>
        <form className={style.form} onSubmit={handleSubmit(registration)}>
          <div className={style.field}>
            <Field
              label={t("Username")}
              error={error?.username}
              iconRight={<MdPerson />}
            >
              <input
                type="text"
                name="username"
                ref={register}
                defaultValue={props?.auth?.username}
              />
            </Field>
          </div>
          <div className={`${style.field} ${style["grid-2"]}`}>
            <Field label={t("Email")} iconRight={<MdMail />}>
              <input
                type="text"
                name="email"
                ref={register}
                defaultValue={props?.auth?.email}
              />
            </Field>
            <Field label={t("Phone")} iconRight={<MdPhone />}>
              <input
                type="text"
                name="phone"
                ref={register}
                defaultValue={props?.auth?.phone}
              />
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
                defaultValue={props?.auth?.address?.street}
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
                defaultValue={props?.auth?.address?.number}
              />
            </Field>
            <Field label={t("Apt")}>
              <input
                type="text"
                name="address.apt"
                ref={register}
                onBlur={resetAddress}
                defaultValue={props?.auth?.address?.apt}
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
            <Link href={`/market/${company}/client/login`}>
              <a className="btn">
                {t("Already have an account?")}, {t("Login")}
              </a>
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

export async function getStaticPaths() {
  const paths = [{ params: { company: "kioskito" } }];
  // fetch all my companies
  return { paths, fallback: false };
}
export async function getStaticProps() {
  return {
    props: {
      recaptchaKey: process.env.RECAPTCHA_PUBLIC_KEY,
    },
  };
}
