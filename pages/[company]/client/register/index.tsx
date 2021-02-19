import Head from "next/head";
import style from "./style.module.scss";
import React from "react";
import { MdLocationOn, MdMail, MdPerson, MdPhone } from "react-icons/md";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { BsShieldLock } from "react-icons/bs";
import useClient from "../useClient";
import Check from "../../../../comp/form/check";
import Field from "../../../../comp/form/field";
import Loader from "../../../../comp/loader";
import { csrfToken } from "next-auth/client";
import {
  ContactField,
  LocationField,
  PersonalField,
  PinField,
} from "../../../../comp/form/fields";

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
          <PersonalField error={error} register={register} style={style} />
          <ContactField error={error} register={register} style={style} />
          <PinField error={error} register={register} style={style} />
          <LocationField
            error={error}
            onBlur={resetAddress}
            register={register}
            style={style}
            defaultValue={{ address: { city: "Buenos Aires, Arg." } }}
          />
          <div className={style["grid-2"]}>
            <div>
              <Check
                label="Yes, I accept Terms of Services"
                name="tos"
                register={register}
              />
              <Check
                label="Yes, I want to receive specials offers"
                name="offer"
                register={register}
              />
            </div>
            <div className={style.submit}>
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
