import React from 'react'
import FilterBar from '@/app/FilterBar'
import connectDb from "../../../../middleware/mongoose"
import Products from "../../../../models/Products"
import ProductsWomen from "../../../../models/ProductsWomen"
import ProductsKids from "../../../../models/ProductsKids"
import ProductsBeauty from "../../../../models/ProductsBeauty"
import ProductsBrand from "../../../../models/ProductsBrand"

const page = async (slug) => {
  const k = (slug['params'])["fashion-name"];
  let products = [];
  try {
    const productModels = {
        men: Products,
        women: ProductsWomen,
        kids: ProductsKids,
        beauty: ProductsBeauty,
        brand: ProductsBrand,
    };
    const ProductModel = productModels[k];
    if (ProductModel) {
      await connectDb();
      const foundProducts = await ProductModel.find();
      products = JSON.parse(JSON.stringify(foundProducts));
    }
  } catch (error) {
    console.error("Unable to load product listing:", error.message);
  }
  
  return (
    <>
      <div>
        <FilterBar outlet={products}></FilterBar>
      </div>
    </>
  )
}
export default page
