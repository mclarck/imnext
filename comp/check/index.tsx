import style from "./style.module.scss";

export default function Check({ title, onAccept }) {
  function handle(e) {
    onAccept(e.target.checked);
  }
  return (
    <label className={style.Tos}>
      <input type="checkbox" name="tos" onChange={handle} />
      <span className={style.title}>{title}</span>
    </label>
  );
}
