import connectDb from "../../../../middleware/mongoose"
import Orders from "../../../../models/Orders"
const Razorpay = require("razorpay");
const shortid = require("shortid");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
export async function POST(req, res) {
  console.log("Payment Gate Route js is Running >>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log("Request is::::::::::::", req);
  const mydata = await req.json()
  console.log("My Data is:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", mydata);
  var date = new Date();
  const { FName, LName, address, city, state, pinCode, totalAmount, prodInfo, id } = mydata
  console.log("FName is::::", FName);
  console.log(mydata);
  // Initialize razorpay object
  // then add it's id

  const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  // Create an order -> generate the OrderID -> Send it to the Front-end
  // Also, check the amount and currency on the backend (Security measure)
  const payment_capture = 1;
  const amount = totalAmount;
  const currency = "INR";
  const options = {
    amount: (totalAmount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {

    const response = await razorpay.orders.create(options);
    await connectDb();
    let arr = []
    for (let i = 0; i < prodInfo.length; i++) {
      let element = prodInfo[i];
      arr.push({
        productId: element['_id'],
        quantity: 1
      })
    }
    console.log("Response is::::::::::::::::::::::::::::", response);
    let p = new Orders({
      userEmail: (id.data)['email'],
      OrderId: response.id,
      address: address,
      products: arr,
      amount: response.amount,
      status: "Processing",

    })
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: id.data.email,
      subject: 'Your Order has Been Succesfully Placed',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Brand WestWood</title>
      <style>
        /* Inline CSS for Email Styling */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo img {
          max-width: 150px;
        }
        .order-details {
          margin-bottom: 20px;
        }
        .order-details h2 {
          margin-top: 0;
          color: #333;
          border-bottom: 2px solid #333;
          padding-bottom: 5px;
        }
        .order-info {
          margin-bottom: 10px;
          color: #666;
        }
        .order-info strong {
          color: #333;
        }
        .order-total strong {
          color: #333;
        }
      </style>
      </head>
      <body>
      <div class="container">
        <div class="logo">
          <img src="./westlogo.png" alt="Brand WestWood Logo">
        </div>
        <div class="order-details">
          <h2>Order Placed Successfully</h2>
          <div class="order-info">
            <strong>Name:</strong>${FName} ${LName}<br>
            <strong>Address:</strong>${address}<br>
            <strong>City:</strong>${city}<br>
            <strong>State:</strong> ${state}<br>
          </div>
          <div class="order-total">
            <strong>Total Amount:</strong>${totalAmount}
          </div>
        </div>
      </div>
      </body>
      </html>
      
      `
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Nodemailer error:", error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info);
        }
      });
    });
    await p.save();
    return Response.json({
      id: response.id,
      currency: "INR",
      amount: response.amount
    }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ success: false }, { status: 400 })
  }

}
