/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    massage: "Success!",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log("Stripe Payment Intent:", paymentIntent);
    res.status(201).json({ clientSecret: paymentIntent.client_secret })
  } else {
    res.status(403).json({ message: "The total should be more than zero" });
  }
});
app.listen(4000,(err)=>{
    if(err) throw err;
    console.log("Amazon Server is running on port 4000,http://localhost:4000");
})


  