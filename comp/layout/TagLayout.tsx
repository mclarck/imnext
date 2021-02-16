import React from "react";
import style from "./style.module.scss";
import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TagLayout({
  children,
  title,
  subtitle,
  wrap,
}: {
  children: any;
  title?: any;
  subtitle?: any;
  wrap?: boolean;
}) {
  const {
    query: { company },
  } = useRouter();
  let bodyClass = style.body;
  if (wrap) bodyClass = bodyClass + " " + style.wrap;
  return (
    <div className={style.tagLayout}>
      <div className={style.header}>
        <section>
          {title && <div className={style.title}>{title}</div>}
          {subtitle && <div className={style.subtitle}>{subtitle}</div>}
        </section>
        <nav className={style.actions}>
          <ul>
            <li>
              <a href={`/market/${company}/stocks/${title}`}>
                <span className={style.name}>more</span>
                <span className={style.icon}>
                  <HiChevronRight />
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={bodyClass}>{children}</div>
    </div>
  );
}
