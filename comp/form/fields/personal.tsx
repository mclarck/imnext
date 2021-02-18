import React from "react";
import { MdPerson } from "react-icons/md";
import { t } from "../../../locale";
import Field from "../field";

export default function PersonalField({
  style,
  register,
  error,
  defaultValue,
}: {
  style: any;
  register: any;
  defaultValue?: any;
  error?: any;
  onBlur?: () => void;
}) { 
  return (
    <React.Fragment>
      <div className={style.field}>
        <Field
          label={t("Username")}
          error={error?.username}
          iconRight={<MdPerson />}
        >
          <input type="text" name="username" defaultValue={defaultValue?.username} ref={register} />
        </Field>
      </div>
    </React.Fragment>
  );
}
