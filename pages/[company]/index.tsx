import { t } from "i18n-js";
import Head from "next/head";
import React from "react"; 
import { Article } from "../../comp/article";
import { MainLayout, TagLayout } from "../../comp/layout";
import { Search } from "../../comp/search";
import { TagList } from "../../comp/taglist";
import { TagSlider } from "../../comp/tagslider";
import { GET_STOCKS } from "../../model/stock/queries";
import { initializeApollo } from "../../services/graphql/apolloClient";
import useStocks from "./stocks/useStocks";
import style from "./style.module.scss";

export default function StockOverview({ stocks }) {
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
              title="Cerverza"
              subtitle="Some description about cerveza"
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
  const paths = [{ params: { company: "kioskito" } }];
  // fetch all my companies
  return { paths, fallback: false };
}

export async function getStaticProps() {
  const apollo = initializeApollo();
  let stocks: any = {};
  try {
    stocks = await apollo.query({ query: GET_STOCKS });
  } catch (error) {
    console.log(error.message);
  }
  return {
    props: {
      stocks: stocks?.data?.stocks?.edges || null,
    },
  };
}
