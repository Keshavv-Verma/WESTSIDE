'use server'

import ProductShow from "./ProductShow";
import { headers } from "next/headers";
import connectDb from "../../../../../../middleware/mongoose";
import Products from "../../../../../../models/Products";
import ProductsWomen from "../../../../../../models/ProductsWomen";
import ProductsKids from "../../../../../../models/ProductsKids";
import ProductsBrand from "../../../../../../models/ProductsBrand";
import ProductsBeauty from "../../../../../../models/ProductsBeauty";

const DataComponent =async (outlet) => {
  
    const fetchData = async () => {
        try {
          const slug = (outlet['outlet'])['url'];
          await connectDb();
          let myquery = slug['product-name'].split("-").join(" ");
          const type = slug['fashion-name'];
          let query = null;
          if (type == 'men') {
              query = Products.findOne({ 'slug': myquery });
          } else if (type == 'women') {
              query = ProductsWomen.findOne({ 'slug': myquery });
          } else if (type == 'kids') {
              query = ProductsKids.findOne({ 'slug': myquery });
          } else if (type == 'beauty') {
              query = ProductsBeauty.findOne({ 'slug': myquery });
          } else if (type == 'brand') {
              query = ProductsBrand.findOne({ 'slug': myquery });
          }
          if (!query) return undefined;
          query.select('title slug desc img category size color price quantity reviews');
          const myproduct = await query.exec();
          if (myproduct) {
            return JSON.parse(JSON.stringify({ product: myproduct, slug }));
          }
        } catch (error) {
          console.error("Error fetching data directly:", error);
        }
      };
      
      const fetchSimilarProducts=async (params)=>{
        try {
          await connectDb();
          const type = params.slug['fashion-name'];
          const category = params.product.category;
          let query = null;
          if (type == 'men') {
              query = Products.find({ 'category': category });
          } else if (type == 'women') {
              query = ProductsWomen.find({ 'category': category });
          } else if (type == 'kids') {
              query = ProductsKids.find({ 'category': category });
          } else if (type == 'beauty') {
              query = ProductsBeauty.find({ 'category': category });
          } else if (type == 'brand') {
              query = ProductsBrand.find({ 'category': category });
          }
          if (!query) return [];
          query.select('title slug img category size color price quantity');
          const myproduct = await query.exec();
          return JSON.parse(JSON.stringify(myproduct || []));
        } catch (error) {
          console.error("Error fetching similar products directly:", error);
          return [];
        }
      }
      let newPromise =  
                new Promise(function (resolve, reject) { 
                setTimeout(function () { 
                    resolve("Hello Geeks. Wrapped  setTimeout() in a promise"); 
                }, 100); 
            }); 
            let result = await newPromise; 
      let outData = await fetchData();
      let five = 0;
      let four = 0;
      let three = 0;
      let two = 0;
      let one = 0;
      let fetchSimilar = [];

      if (outData && outData['product']) {
        console.log("my OutData is is is:::::::::::::::::::", outData['product']);
        const reviews = outData['product']['reviews'] || [];
        let n = reviews.length;
        for (let i = 0; i < n; i++) {
          const rate = reviews[i]['rating'];
          if (rate == 5) {
            five++;
          }
          if (rate == 4) {
            four++;
          }
          if (rate == 3) {
            three++;
          }
          if (rate == 2) {
            two++;
          }
          if (rate == 1) {
            one++;
          }
        }
        fetchSimilar = await fetchSimilarProducts(outData);
      }

      const headersList = headers()
      const reqmail = headersList.get('user-email')

      console.log("refrre is.................................................", reqmail);
      return (
        <>
        {(outData == undefined || outData['product'] == undefined) && <div> <div className='h-full w-full flex justify-center items-center'>
            <img className='my-8' src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif" alt="" />
            </div></div>}
        {(outData != undefined && outData['product'] != undefined) &&
        <ProductShow outlet={{outData,fetchSimilar,"rateArray":[five,four,three,two,one],reqmail}}></ProductShow>}
        </>
      )
}

export default DataComponent