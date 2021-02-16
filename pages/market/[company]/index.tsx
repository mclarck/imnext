import Head from "next/head";
import React, { useContext } from "react";
import { Article } from "../../../comp/article";
import { MainLayout, TagLayout } from "../../../comp/layout";
import { Search } from "../../../comp/search";
import { TagList } from "../../../comp/taglist";
import { TagSlider } from "../../../comp/tagslider";
import { GET_STOCKS } from "../../../model/stock/queries";
import { GraphqlCtx } from "../../../services/graphql";
import useStocks from "./stocks/useStocks";
import style from "./style.module.scss";

export default function StockOverview() {
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
              title="Cerverza"
              subtitle="Some description about cerveza"
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

export async function getStaticPaths() {
  const paths = [{ params: { company: "kioskito" } }];
  return { paths, fallback: false };
}

export async function getStaticProps() {  
  return {
    props: {},
  };
}
