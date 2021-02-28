import Head from "next/head";
import React from "react";
import { Article } from "../../../comp/article";
import { MainLayout, TagLayout } from "../../../comp/layout";
import Loader from "../../../comp/loader";
import { Search } from "../../../comp/search";
import { TagSlider } from "../../../comp/tagslider";
import { t } from "../../../locale";
import { GET_ALL_SPECIES } from "../../../model/stock/queries";
import { getCommonProps } from "../../../services/common";
import { initializeApollo } from "../../../services/graphql/apolloClient";
import style from "../style.module.scss";
import useStocks from "../../../controllers/useStocks";

export default function StockCategory() {
  const {
    company,
    loading,
    filter,
    onSearch,
    stocks,
    getTags,
    category,
    addToCart,
  } = useStocks();
  const tags = getTags();
  if (loading) return <Loader />;
  return (
    <MainLayout>
      <Head>
        <title>
          {company} - {category}
        </title>
      </Head>
      <div className={style.overView}>
        <div className={style.search}>
          <Search size="lg" onSearch={onSearch} />
        </div>
        <div className={style.slider}>
          <TagSlider tags={tags} />
        </div>
        <section className={style.articles}>
          {tags?.map(
            (tag, index) =>
              tag === category && (
                <div key={index} className={style.article}>
                  <TagLayout title={tag} wrap={true}>
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
              )
          )}
        </section>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  let paths = []; //[{ params:{ company, category } }]
  let companies = ["kioskito"];
  let categories = [];
  const apollo = initializeApollo();
  const graph = await apollo.query({ query: GET_ALL_SPECIES });
  function mapCategory(stocks) { 
    let tags = stocks?.map((o) => o.node?.product?.specie);
    return tags?.filter((a, b) => tags.indexOf(a) === b);
  }
  categories = mapCategory(graph?.data?.stocks?.edges);
  companies?.map((company) => {
    categories?.map((category) => {
      paths?.push({ params: { company, category } });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { res, params } = context;
  const props = { ...getCommonProps(context) };
  return {
    props: {
      ...props,
    },
  };
}
