import Head from "next/head";
import React from "react";
import { MainLayout } from "../../../comp/layout";
import { Search } from "../../../comp/search";
import { TagList } from "../../../comp/taglist";
import { TagSlider } from "../../../comp/tagslider";
import style from "./style.module.scss";

export default function StockOverview({ company }) {
  return (
    <MainLayout company={company}>
      <Head>
        <title>{company} Stock Overview</title>
      </Head>
      <div className={style.overView}>
        <div className={style.search}>
          <Search size="lg" onSearch={(key: string) => {}} />
        </div>
        <div className={style.slider}>
          <TagSlider
            slides={[() => <TagList />, () => <TagList />, () => <TagList />]}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const paths = [];
  paths.push({ params: { company: "kioskito" } });
  paths.push({ params: { company: "test" } });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      company: params.company,
    },
  };
}
