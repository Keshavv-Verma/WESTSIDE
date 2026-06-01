const mongoose=require("mongoose")
const ProductsSchema=new mongoose.Schema({
    title:{type:String,required:true},
    slug:{type:String,required:true},
    desc:{type:String,required:true},
    img:{type:String},
    category:{type:String,required:true},
    size:{type:String,default:'L'},
    reviews:[
        {useremail:{type:String}
    ,feedback:{type:String}
    ,rating:{type:Number,default:3}}
    ],
    color:{type:String},
    price:{type:Number,required:true},
    quantity:{type:String,required:true,default:1},
},{timestamps:true})
// Not For Recompiling The Module
export default mongoose.models.Products || mongoose.model("Products",ProductsSchema)
