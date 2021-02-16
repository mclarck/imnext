import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Article } from "../../../../comp/article";
import { MainLayout, TagLayout } from "../../../../comp/layout";
import Loader from "../../../../comp/loader/Loader";
import { Search } from "../../../../comp/search";
import { TagList } from "../../../../comp/taglist";
import { TagSlider } from "../../../../comp/tagslider";
import style from "../style.module.scss";
import useStocks from "./useStocks";

export default function StockCategory() {
  const { company, category, addToCart } = useStocks();
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
        <section className={style.articles}>
          <div className={style.article}>
            <TagLayout
              title={category}
              subtitle="Some description about cerveza"
              wrap={true}
            >
              {/* {stocks?.map((stocks, idx) => (
                <Article key={idx} onAddToCart={addToCart} />
              ))} */}
            </TagLayout>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
