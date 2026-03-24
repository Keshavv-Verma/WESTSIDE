'use server'

import { patchFetch } from "next/dist/server/app-render/entry-base";
import ProductShow from "./ProductShow";
import { headers } from "next/headers";

const DataComponent =async (outlet) => {
  
    const fetchData = async () => {
        try {
         
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/fetchProd`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug: ((outlet['outlet'])['url']) }),
          });
          const newData = await response.json();
  
          if (newData.status === true && newData.myproduct != null) {
            const productData = {product:newData.myproduct,slug:((outlet['outlet'])['url'])};
            return productData;  
          } else {
            console.log("Json Not Found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      const fetchSimilarProducts=async (params)=>{
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getSimilarProducts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: params}),
        });
        const newData = await response.json();
        
        if (newData.status === true && newData.myproduct != null) {
          const productData = newData.myproduct;
          return productData;  
        } else {
          console.log("Json Not Found");
        }
      }
      let newPromise =  
                new Promise(function (resolve, reject) { 
                setTimeout(function () { 
                    resolve("Hello Geeks. Wrapped  setTimeout() in a promise"); 
                }, 100); 
            }); 
            let result = await newPromise; 
      let outData=await fetchData();
      console.log("my OutData is is is:::::::::::::::::::",outData['product']);
      let five=0;
      let four=0;
      let three=0;
      let two=0;
      let one=0;
      let n=(outData['product'])['reviews'].length
      for (let i = 0; i <n ; i++) {
        const rate = outData['product']['reviews'][i]['rating'];
        
        if (rate==5) {
          five++;
        }
        if (rate==4) {
          four++;
        }
        if (rate==3) {
          three++;
        }
        if (rate==2) {
          two++;
        }
        if (rate==1) {
          one++;
        }
        
      }
      // console.log("outData is is is is is is",outData);
      let fetchSimilar=await fetchSimilarProducts(outData);
      const headersList = headers()
const reqmail = headersList.get('user-email')

console.log("refrre is.................................................",reqmail);
  return (
    <>
    {outData==undefined && <div> <div className='h-full w-full flex justify-center items-center'>
        <img className='my-8' src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif" alt="" />
        </div></div>}
    {outData!=undefined &&
    <ProductShow outlet={{outData,fetchSimilar,"rateArray":[five,four,three,two,one],reqmail}}></ProductShow>}
    </>
  )
}

export default DataComponent