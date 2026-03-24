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
    let make = await req.json();
    let randomOtp = Math.floor((Math.random() * 10000) + 9);
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: make.email,
      subject: 'Thanks For Coming To Our Website',
      text: `Your One Time Password is ${randomOtp}`
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

    return Response.json({ success: true });
  } catch (error) {
    console.error("genOtp error:", error);
    return Response.json({ success: false, error: error.message });
  }
}