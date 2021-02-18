import style from "./style.module.scss";

export default function Field(props: any) {
  return (
    <label className={style.Field}>
      {props.label && <div className={style.label}>{props.label}</div>}
      {!props.multiline ? (
        <div className={style.control}>
          {props.iconLeft && (
            <div className={style.iconLeft}>{props.iconLeft}</div>
          )}
          {props.children}
          {props.iconRight && (
            <div className={style.iconRight}>{props.iconRight}</div>
          )}
        </div>
      ) : (
        <div className={style.control}>{props.children}</div>
      )}
      {props.tip && <div className={style.tip}>{props.tip}</div>}
      {props.error && <div className={style.error}>{props.error}</div>}
    </label>
  );
}
