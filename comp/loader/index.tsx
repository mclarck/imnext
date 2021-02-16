import React from "react";
import style from "./style.module.scss";

export default function Loader(props) {
  return (
    <div className={style.Loader}>
      <div style={{ ...props.style }}>
        <svg
          style={{
            margin: "auto",
            background: "none",
            display: "block",
            shapeRendering: "auto",
          }}
          width={props.dimension?.width || 150}
          height={props.dimension?.height || 150}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            r="0"
            fill="none"
            stroke="#85a2b6"
            strokeWidth="1"
          >
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1.1627906976744184s"
              values="0;47"
              keyTimes="0;1"
              keySplines="0 0.2 0.8 1"
              calcMode="spline"
              begin="-0.5813953488372092s"
            />
            <animate
              attributeName="opacity"
              repeatCount="indefinite"
              dur="1.1627906976744184s"
              values="1;0"
              keyTimes="0;1"
              keySplines="0.2 0 0.8 1"
              calcMode="spline"
              begin="-0.5813953488372092s"
            />
          </circle>
          <circle
            cx="50"
            cy="50"
            r="0"
            fill="none"
            stroke="#bbcedd"
            strokeWidth="1"
          >
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1.1627906976744184s"
              values="0;47"
              keyTimes="0;1"
              keySplines="0 0.2 0.8 1"
              calcMode="spline"
            />
            <animate
              attributeName="opacity"
              repeatCount="indefinite"
              dur="1.1627906976744184s"
              values="1;0"
              keyTimes="0;1"
              keySplines="0.2 0 0.8 1"
              calcMode="spline"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
}
