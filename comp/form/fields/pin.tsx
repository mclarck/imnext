import React from "react";
import { BsShieldLock } from "react-icons/bs";
import { t } from "../../../locale";
import Field from "../field";

export default function PinField({
  style,
  register,
  error,
}: {
  style: any;
  register: any;
  error?: any;
  onBlur?: () => void;
}) {
  return (
    <React.Fragment>
      <div className={`${style.field} ${style["grid-2"]}`}>
        <Field label={t("PIN")} error={error?.pin} iconRight={<BsShieldLock />}>
          <input type="password" name="pin" ref={register} />
        </Field>
        <Field label={t("Confirm PIN")} iconRight={<BsShieldLock />}>
          <input type="password" name="vpin" ref={register} />
        </Field>
      </div>
    </React.Fragment>
  );
}
