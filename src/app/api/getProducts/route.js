import connectDb from "../../../../middleware/mongoose"
import Products from "../../../../models/Products"
import { NextResponse } from "next/server";
import ProductsWomen from "../../../../models/ProductsWomen";
import ProductsKids from "../../../../models/ProductsKids";
import ProductsBeauty from "../../../../models/ProductsBeauty";
import ProductsBrand from "../../../../models/ProductsBrand";

export const dynamic = 'force-dynamic';

export async function GET(req,res){
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");
        const productModels = {
            men: Products,
            women: ProductsWomen,
            kids: ProductsKids,
            beauty: ProductsBeauty,
            brand: ProductsBrand,
        };
        const ProductModel = productModels[query];

        if (!ProductModel) {
            return NextResponse.json({ products: [], error: "Invalid product category" }, { status: 400 });
        }

        await connectDb();
        const products = await ProductModel.find();
   
        return NextResponse.json({ products });
    } catch (error) {
        if (!error.logged) {
            console.error("Unable to fetch products:", error.message);
        }
        return NextResponse.json({ products: [], error: "Unable to fetch products" }, { status: 500 });
    }
}
