import connectDb from "../../../../middleware/mongoose"
import Orders from "../../../../models/Orders"
export async function POST(req,res) {
    await connectDb();
    let {query}=await req.json();
    let k=Orders.deleteOne({OrderId:query});
    await k.exec();
    return Response.json({"success":true},{status:200});
}
