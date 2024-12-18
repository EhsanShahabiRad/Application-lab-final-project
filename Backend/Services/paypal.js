import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

export const createOrder = async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.body.amount,
          },
        },
      ],
    });

    const response = await client.execute(request);
    res.status(200).json({ id: response.result.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
};
