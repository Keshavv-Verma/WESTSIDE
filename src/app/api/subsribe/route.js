var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function POST(req, res) {
  try {
    let { email } = await req.json();
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'You Are Subsribed To Our Mailing List',
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trending Products</title>
<style>
  /* Inline CSS for email styling */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }
  
  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333333;
  }
  
  .product {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .product img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
  }
  
  .product h2 {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 18px;
    color: #333333;
  }
  
  .product p {
    font-size: 14px;
    color: #666666;
  }
  
  /* Copyright notice */
  .copyright {
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
    color: #999999;
  }
  
  /* Westside logo styling */
  .westside-logo {
    display: block;
    margin: 0 auto;
    width: 150px; /* Adjust size as needed */
    margin-bottom: 20px; /* Adjust margin as needed */
  }
</style>
</head>
<body>
  <div class="container">
    <img src="https://play-lh.googleusercontent.com/hRgzpsHkJdD7uqjnyg1jY6C41JbADOe_rVB9G7UNzkO7t1q0bqPyCFlm2Ms5ubaH-CaF" alt="Westside Logo" class="westside-logo">
    <h1>Trending Products</h1>
    <div class="product">
      <img src="http://www.westside.com/cdn/shop/files/300977359CHARCOAL_1_540x.jpg?v=1711023514" alt="Product 1">
      <h2>Latest Product</h2>
      <p>Description of Product 1 goes here.</p>
    </div>
    <div class="product">
      <img src="http://www.westside.com/cdn/shop/files/300970005OFFWHITE_1_540x.jpg?v=1711432263" alt="Product 2">
      <h2>Latest Themes</h2>
      <p>Description of Product 2 goes here.</p>
    </div>
    <div class="product">
      <img src="http://www.westside.com/cdn/shop/files/300977359CHARCOAL_1_540x.jpg?v=1711023514" alt="Product 3">
      <h2>Latest Fashion</h2>
      <p>Description of Product 3 goes here.</p>
    </div>
    <div class="copyright">
      &copy; 2024 Your Company Name. All Rights Reserved.
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

    return Response.json({ "success": true }, { status: 200 })

  } catch (error) {
    console.error("Subscribe error:", error);
    return Response.json({ "success": false, error: error.message }, { status: 404 })
  }
}