import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

function EditProduct({ id, title, description, price, brand, image }) {
  const [formData, setFormData] = useState({
    id,
    title,
    description,
    brand,
    price,
    image,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await axios.patch(`http://localhost:8000/api/products/${id}`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", id],
        exact: true,
      });
    },
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    mutate(id);
  }

  return (
    <div className="editFormBlk">
      <form onSubmit={handleSubmit}>
        {/* title */}
        <div className="titleBlk">
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        {/* description */}
        <div className="descriptionBlk">
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        {/* price */}
        <div className="priceBlk">
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        {/* brand */}
        <div className="brandBlk">
          <input
            type="text"
            name="brand"
            id="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        {/* image */}
        <div className="imageBlk">
          <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="editBtnBlk">
          <button className="editBtn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
