import React from "react";

const ProductData = ({ title, info }) => {
  return (
    <div className="productData">
      <p>{title}: </p>
      <span className="productSpan">{info}</span>
    </div>
  );
};

export default ProductData;
