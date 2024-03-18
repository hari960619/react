import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../utils/queryFunctions";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import AddProduct from "./AddProduct";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

function Products() {
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    // staleTime: 60 * 1000 * 5,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`http://localhost:8000/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
    },
  });

  return (
    <div>
      <h1 className="ct">ADD A PRODUCT</h1>
      <div className="homePage">
        <div>
          <AddProduct />
        </div>
        <div className="productsDivBlk">
          <h1 className="ct">PRODUCTS</h1>
          {isLoading ? <Loading /> : ""}
          {isError ? <Error /> : ""}
          <div id="productsDiv">
            {products?.map((product) => {
              return (
                <div key={product._id} className="prodDiv">
                  <NavLink to={`/products/${product._id}`}>
                    {product.title}
                  </NavLink>
                  <button onClick={() => mutate(product._id)}>
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
