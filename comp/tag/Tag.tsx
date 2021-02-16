import React from "react";
import style from "./style.module.scss";
import Link from "next/link";

export default function Tag({
  name,
  path,
  className,
}: {
  name: string;
  path: string;
  className?: string;
}) {
  const cname = style.Tag;
  if (className) cname.concat(" " + className);
  return (
    <Link href={`${path}/stocks/${name}`}>
      <a className={cname}>
        <span>{name}</span>
      </a>
    </Link>
  );
}
