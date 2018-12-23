import React from "react";
import "./ProductCell.scss";

export const ProductCell = props => {
  const isBestAmount = props.item && props.item.price && props.best && props.best.amount === props.item.price.amount;
  const isValidate = props.best && (props.best.model === props.model && props.best.duration === props.duration)
  return (
    <div className="ProductCell">
      <div className={isBestAmount && isValidate ? "cell-text-max" : "cell-text"}>
        {props.item && props.item.price ? (
          <div>
            <span>{props.item.price.symbol}</span>
            <span>{props.item.price.amount}</span>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>
    </div>
  );
};
