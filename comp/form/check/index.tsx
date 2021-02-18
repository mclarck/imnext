import style from "./style.module.scss";

export default function Check({ label, name, register }) {
  return (
    <label className={style.Check}>
      <input
        type="checkbox"
        ref={register}
        name={name}
        defaultChecked={false}
      />
      <span className={style.title}>{label}</span>
    </label>
  );
}
