import React from "react";
import style from "./style.module.scss";
import Link from "next/link";

export default function Tag({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const cname = style.Tag;
  if (className) cname.concat(" " + className);
  return (
    <Link href="#">
      <a className={cname}>
        <span>{name}</span>
      </a>
    </Link>
  );
}
