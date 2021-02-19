import React, { useState } from "react";
import { Modal } from "../layout";
import Incrementor from "./Incrementor";
import style from "./style.module.scss";
import Image from "next/image";
import { fileUrl } from "../../lib/ultils";
import { t } from "../../locale";

export default function Article({
  limit,
  onAddToCart,
  AddToCartLabel,
  notice,
  descriptions,
  data,
}: {
  data: any;
  descriptions?: any;
  notice?: any;
  onAddToCart: Function;
  limit?: number;
  AddToCartLabel?: string;
}) {
  const [clicked, setCliked] = useState(false);
  const [inc, setInc] = useState(0);
  function submit() {
    onAddToCart({ quantity: inc });
    setCliked(false);
  }
  function toggleModal() {
    setCliked(!clicked);
    setInc(0);
  }
  function renderArticle({ isOpen }: { isOpen?: boolean }) {
    return (
      <article className={style.article}>
        <section>
          <div className={style.thumb}>
            <img src={fileUrl(data.file)} />
          </div>
          <aside>
            <div className={style.infos}>
              <div className={style.title}>{data?.product?.specie}</div>
              <div className={style.description}>
                <div>{data?.product?.mark}</div>
                {descriptions ? (
                  descriptions
                ) : (
                  <div>
                    {data?.product?.variety} {data?.product?.container}
                  </div>
                )}
              </div>
            </div>
            {isOpen && (
              <aside className={style.features}>
                <Incrementor limit={limit} onChange={setInc} />
              </aside>
            )}
          </aside>
        </section>
        <section className={style.pricing}>
          <div className={style.price}>
            <span className={style.currency}>{data?.currency || "$"}</span>
            <span className={style.amount}>{data?.price || "-"}</span>
            <span className={style.strike}>{data.oldPrice || ""}</span>
          </div>
          {notice && <aside>{notice}</aside>}
          {isOpen && (
            <div className={style.actions}>
              <button
                type="button"
                className="btn btn-success"
                onClick={submit}
              >
                {AddToCartLabel || t("Add To Cart")}
              </button>
            </div>
          )}
        </section>
      </article>
    );
  }
  return (
    <React.Fragment>
      <button type="button" className={style.wrapper} onClick={toggleModal}>
        {renderArticle({})}
      </button>
      {clicked && (
        <Modal onClose={toggleModal}>
          <div className={style.modalWrapper}>
            {renderArticle({ isOpen: true })}
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}
