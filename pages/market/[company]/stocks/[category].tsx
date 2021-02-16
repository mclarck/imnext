import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Article } from "../../../../comp/article";
import { MainLayout, TagLayout } from "../../../../comp/layout";
import Loader from "../../../../comp/loader";
import { Search } from "../../../../comp/search";
import { TagList } from "../../../../comp/taglist";
import { TagSlider } from "../../../../comp/tagslider";
import { t } from "../../../../locale";
import { GET_STOCKS } from "../../../../model/stock/queries";
import { initializeApollo } from "../../../../services/graphql/apolloClient";
import style from "../style.module.scss";
import useStocks from "./useStocks";

export default function StockCategory({ stocks }) {
  const { company, category, addToCart } = useStocks();
  return (
    <MainLayout>
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
              {stocks?.map((stock, idx) => (
                <Article
                  key={idx}
                  onAddToCart={(o) => addToCart({ ...o, stock: stock.node })}
                  data={stock.node}
                  AddToCartLabel={t("Add to Cart")}
                />
              ))}
            </TagLayout>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const paths = [{ params: { company: "kioskito", category: "Cerveza" } }];
  // fetch all my companies
  return { paths, fallback: false };
}

export async function getStaticProps() {
  const apollo = initializeApollo();
  let stocks = await apollo.query({ query: GET_STOCKS });
  return {
    props: {
      stocks: stocks?.data?.stocks?.edges || null,
    },
  };
}
