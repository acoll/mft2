import { h } from "preact";
import style from "./button.less";

export default function ButtonWithSpinner({ children, spinning = false }) {
  return (
    <button disabled={!!spinning} class={style.button}>
      <div>
        <div />
        <div className="label">{children}</div>
        <div className={`spinner ${spinning ? "active" : ""}`} />
      </div>
    </button>
  );
}
