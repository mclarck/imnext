import { currentLocale } from "i18n-js";
import React, { useState } from "react";
import style from "./style.module.scss";
import { useRouter } from "next/router";

export default function TagSlider({ slides }: { slides: Array<Function> }) { 
  const [selected, select] = useState<string>("radio-1");
  function handle(e: any) {
    select((current) => (current = e.target.value));
  } 
  return (
    <div className={style.tagSlider}>
      {slides.map((slide, idx) => {
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
      <div className={style.wrapper}>
        <ul className={style.slides}>
          {slides.map((Slide: any, idx) => {
            const cssId = `radio-${idx + 1}`;
            return (
              <div
                key={idx}
                className={style.slide}
                style={{ visibility: cssId == selected ? "visible" : "hidden" }}
              >
                <Slide />
              </div>
            );
          })}
        </ul>
      </div>
      <div className={style.bullets}>
        {slides.map((slide, idx) => {
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
  );
}
