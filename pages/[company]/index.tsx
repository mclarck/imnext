import { reject } from "lodash";
import Head from "next/head";
import React from "react";
import { Advice } from "../../comp/advice";
import { Article } from "../../comp/article";
import { MainLayout, Modal, TagLayout } from "../../comp/layout";
import Loader from "../../comp/loader";
import { Search } from "../../comp/search";
import { TagSlider } from "../../comp/tagslider";
import { t } from "../../locale";
import useStocks from "./stocks/useStocks";
import style from "./style.module.scss";

export default function StockOverview() {
  const {
    company,
    onSearch,
    filter,
    filterKey,
    stocks,
    loading,
    getTags,
    addToCart,
  } = useStocks();
  const tags = getTags();
  if (loading) return <Loader />;
  return (
    <MainLayout>
      <Head>
        <title>
          {company} - {t("Stock Overview")}
        </title>
      </Head>
      <div className={style.overView}>
        <div className={style.search}>
          <Search size="lg" onSearch={onSearch} advanced />
        </div>
        <div className={style.slider}>
          <TagSlider tags={tags} />
        </div>
        <section className={style.articles}>
          {tags?.map((tag, index) => {
            if (filterKey && filterKey !== tag) return null;
            return (
              <div key={index} className={style.article}>
                <TagLayout title={tag}>
                  {filter(stocks)?.map((stock, idx) => (
                    <Article
                      key={idx}
                      onAddToCart={(o) =>
                        addToCart({ ...o, stock: stock.node })
                      }
                      data={stock.node}
                      AddToCartLabel={t("Add to Cart")}
                    />
                  ))}
                </TagLayout>
              </div>
            );
          })}
        </section>
      </div>
      <Advice />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { res, params } = context;
  if (params.company !== "Kioskito") {
    res.statusCode = 302; 
    res.setHeader("Location", `/errors/404`);
  }
  return {
    props: {
      company: params.company,
    },
  };
}
