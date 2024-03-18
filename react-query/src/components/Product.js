import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

import axios from "axios";
import EditProduct from "./EditProduct";

function Product() {
  const [showEdit, setShowEdit] = useState(false);
  const { productID } = useParams();
  // console.log(productID);
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productID],
    queryFn: async () => {
      let res = await axios.get(
        `http://localhost:8000/api/products/${productID}`
      );
      // console.log(res.data.product);
      return res.data.product;
    },
    staleTime: Infinity,
  });
  return (
    <div>
      {isLoading ? <Loading /> : ""}
      {isError ? <Error /> : ""}

      {product && (
        <div className="productDiv">
          <h1 className="ct"> {product.title} </h1>
          <h2 className="ct">{product.brand}</h2>
          <h3 className="ct">{product.description}</h3>
          <p className="ct">Price: {product.price}</p>
          <img src={product.image[0]} alt={product.title} />
        </div>
      )}
      <div className="editBtnBlk">
        <button
          className="editBtn"
          onClick={() => {
            setShowEdit(!showEdit);
          }}
        >
          {showEdit ? "Close Edit" : "Edit Product"}
        </button>
      </div>
      {showEdit && <EditProduct {...product} id={productID} />}
    </div>
  );
}

export default Product;
