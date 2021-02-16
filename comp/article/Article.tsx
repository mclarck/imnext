import React, { useEffect, useState } from "react";
import { Modal } from "../layout";
import Incrementor from "./Incrementor";
import style from "./style.module.scss";

export default function Article({
  limit,
  onAddToCart,
  AddToCartLabel,
}: {
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
            <img src="https://api.inmarketify.ml/public/uploads/medias/kioskito/d570c19f-5dc8-4564-94bf-4684d3faab9a.png" />
          </div>
          <aside>
            <div className={style.infos}>
              <div className={style.title}>Specie Name</div>
              <div className={style.description}>
                Some description about th product
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
            <span className={style.currency}>$</span>
            <span className={style.amount}>450</span>
            <span className={style.strike}>500</span>
          </div>
          <aside>Envio Gratis</aside>
          {isOpen && (
            <div className={style.actions}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submit}
              >
                {AddToCartLabel || "Add To Cart"}
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
