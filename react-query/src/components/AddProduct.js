import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    image: "",
  });

  const queryClient = useQueryClient();

  const [btnValue, setBtnValue] = useState("ADD PRODUCT");

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (newProduct) => {
      return await axios.post("http://localhost:8000/api/products", newProduct);
    },
    onMutate: async (variables) => {
      // console.log(variables);
      /* Cancel current queries for the todos list
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      Create optimistic todo
      const optimisticTodo = { id: uuid(), title: variables.title };
      Add optimistic todo to todos list
      queryClient.setQueryData(["todos"], (old) => [...old, optimisticTodo]);
      Return context with the optimistic todo
      return { optimisticTodo }; */
    },
    onSuccess: (result, variables, context) => {
      // console.log(result, variables, context);
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
        // Only invalidates the queryKey mentioned above in case if any extra parameters are given like queryKey: ["products", id]
      });
      /* Replace optimistic todo in the todos list with the result
      queryClient.setQueryData(["todos"], (old) => old.map((todo) => todo.id === context.optimisticTodo.id ? result : todo )); */
    },
    onError: (error, variables, context) => {
      // console.log(error);
      // console.log(variables);
      // console.log(context);
      /*    Remove optimistic todo from the todos list
      queryClient.setQueryData(["todos"], (old) =>
        old.filter((todo) => todo.id !== context.optimisticTodo.id)
      ); */
    },
    onSettled: (variables) => {
      // console.log(variables);
      // console.log("I run if there is error also, if there is success also.");
    }, //Settled runs whether it is a success or not.
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleClick(e) {}

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    mutate(formData);
    if (isPending) setBtnValue("Adding Product...");
    if (isError) setBtnValue("Error!!!");
    if (isSuccess) {
      setBtnValue("Product Added");
      setTimeout(() => {
        setBtnValue("ADD PRODUCT");
      }, 5000);
    }
    setFormData({
      title: "",
      description: "",
      price: "",
      brand: "",
      image: "",
    });
  }

  return (
    <div className="addProductDiv">
      <form className="formBlk" onSubmit={handleSubmit}>
        {/* title */}
        <div className="inputBlk">
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <span className="inputLabel">Enter product Title</span>
        </div>
        {/* description */}
        <div className="inputBlk">
          <input
            type="text"
            name="description"
            id="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <span className="inputLabel">Enter product description</span>
        </div>
        {/* price */}
        <div className="inputBlk">
          <input
            type="number"
            name="price"
            id="price"
            required
            value={formData.price}
            onChange={handleChange}
          />
          <span className="inputLabel">Enter product price</span>
        </div>
        {/* brand */}
        <div className="inputBlk">
          <input
            type="text"
            name="brand"
            id="brand"
            required
            value={formData.brand}
            onChange={handleChange}
          />
          <span className="inputLabel">Enter product brand</span>
        </div>
        {/* image */}
        <div className="inputBlk">
          <input
            type="text"
            name="image"
            id="image"
            required
            value={formData.image}
            onChange={handleChange}
          />
          <span className="inputLabel">Enter image link</span>
        </div>
        <button type="submit" id="submitBtn" onClick={handleClick}>
          {btnValue}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
