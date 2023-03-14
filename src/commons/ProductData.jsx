import React from "react";

const ProductData = ({ title, info }) => {
  return (
    <div className="productData">
      {title? <p>{title}: </p> : null}
      <span className="productSpan">{info}</span>
    </div>
  );
};

export default ProductData;
