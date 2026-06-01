import connectDb from "../../../../middleware/mongoose";
import Orders from "../../../../models/Orders";
import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const mydata = await request.json();
    const { address, totalAmount, prodInfo, id } = mydata;

    // Validate input data
    if (!Array.isArray(prodInfo)) {
      console.error('Invalid prodInfo:', prodInfo);
      return NextResponse.json({ success: false, error: 'Invalid product info' }, { status: 400 });
    }
    // Ensure totalAmount is a number
    const amountNumber = Number(totalAmount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      console.error('Invalid totalAmount:', totalAmount);
      return NextResponse.json({ success: false, error: 'Invalid total amount' }, { status: 400 });
    }
    // Safely extract user email
    const userEmail = id?.email || (id && id.data && id.data.email) || '';
    if (!userEmail) {
      console.error('Missing user email:', id);
      return NextResponse.json({ success: false, error: 'Missing user email' }, { status: 400 });
    }

    // Initialize Stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Westside Clothing Order',
              description: prodInfo.map(p => p.title).join(', ').substring(0, 500),
            },
            unit_amount: Math.round(amountNumber * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000/'}orders/trackOrder/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000/'}cart`,
      customer_email: userEmail,
    });

    // Connect to DB before saving order
    await connectDb();

    const productsArray = prodInfo.map((p) => ({
      productId: p._id,
      quantity: 1,
    }));

    const order = new Orders({
      userEmail: userEmail,
      OrderId: session.id,
      address,
      products: productsArray,
      amount: Math.round(amountNumber * 100),
      status: "Processing",
    });

    await order.save();

    return NextResponse.json(
      {
        id: session.id,
        url: session.url,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("paymentGate error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

