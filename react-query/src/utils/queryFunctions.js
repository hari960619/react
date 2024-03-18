import axios from "axios";

export async function getProducts() {
  let res = await axios.get("http://localhost:8000/api/products");
  //   console.log(res.data.products);
  return res.data.products;
}
