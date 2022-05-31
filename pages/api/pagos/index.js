const paypal = require('@paypal/checkout-server-sdk');
  
// Creating an environment
let clientId = "ATbp7wMUFboTry_dipCAFlbyEOwed48AyWpd6bGjOWM_uLRc3qccy__lSYMvMNjqqx9CZ8v_C3hdCQCA";
let clientSecret = "EIjVZDA27gSc1aHp1MpfutVMXlxpS6ozJYM-Cm6CF-nyLybM4jM7jWMc0zI8kw4m6vtgS5rCfT116vor";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res){
    const {cantidad, idProyecto, idUsuario, fecha}=req.body
    if (req.method === "POST") {

        const request = new paypal.orders.OrdersCreateRequest()
        request.requestBody({
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": cantidad
                    }
                }
             ]
        });
        const response = await client.execute(request)
        return res.status(200).json({id: response.result.id})
    }
}