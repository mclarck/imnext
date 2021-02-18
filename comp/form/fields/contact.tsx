import React from "react";
import { BsShieldLock } from "react-icons/bs";
import { MdMail, MdPhone } from "react-icons/md";
import { t } from "../../../locale";
import Field from "../field";

export default function ContactField({
  style,
  register,
  error,
  defaultValue,
}: {
  style: any;
  register: any;
  error?: any;
  defaultValue?: any;
  onBlur?: () => void;
}) {
  return (
    <div>
      <div className={`${style.field} ${style["grid-2"]}`}>
        <Field label={t("Email")} error={error?.email} iconRight={<MdMail />}>
          <input
            type="text"
            defaultValue={defaultValue?.email}
            name="email"
            ref={register}
          />
        </Field>
        <Field label={t("Phone")} error={error?.phone} iconRight={<MdPhone />}>
          <input
            type="text"
            defaultValue={defaultValue?.phone}
            name="phone"
            ref={register}
          />
        </Field>
      </div>
    </div>
  );
}
