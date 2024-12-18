import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const PAYPAL_API = "https://api-m.sandbox.paypal.com"; 
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

const generateAccessToken = async () => {
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
};

const PayPalController = {
  createOrder: async (req, res) => {
    try {
      const { orderTotal } = req.body;

      const accessToken = await generateAccessToken();

      const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: orderTotal,
              },
            },
          ],
        }),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      res.status(500).json({ error: "Failed to create PayPal order" });
    }
  },
};

export default PayPalController;
