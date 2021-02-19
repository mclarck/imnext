import React, { useState } from "react";
import style from "./style.module.scss";
import { useRouter } from "next/router";
import { Tag } from "../tag"; 

export default function TagSlider({ tags }: { tags: Array<Function> }) {
  const {
    query: { company },
  } = useRouter();
  const [selected, select] = useState<string>("radio-1");
  function handle(e: any) {
    select((current) => (current = e.target.value));
  }
  if (tags.length <= 1) return <div />;
  return (
    <div className={style.tagSlider}>
      <div>
        <React.Fragment>
          {tags.map((tag, idx) => {
            const cssId = `radio-${idx + 1}`;
            return (
              <input
                key={idx}
                type="radio"
                id={style[cssId]}
                defaultValue={cssId}
                name="slide"
                onChange={handle}
              />
            );
          })}
        </React.Fragment>
        <div className={style.wrapper}>
          <ul className={style.slides}>
            {tags.map((tag: any, idx) => {
              const cssId = `radio-${idx + 1}`;
              return (
                <div
                  key={idx}
                  className={style.slide}
                  style={{
                    visibility: cssId == selected ? "visible" : "hidden",
                  }}
                >
                  <Tag name={tag} path={`/${company}/stocks/${tag}`} />
                </div>
              );
            })}
          </ul>
        </div>
        <div className={style.bullets}>
          {tags.map((tag, idx) => {
            const cssId = `radio-${idx + 1}`;
            return (
              <label
                key={idx}
                htmlFor={style[cssId]}
                className={style.bullet}
              ></label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
