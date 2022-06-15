import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: 20,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
    }
  }, [success]);

  console.log(1, orderID);
  console.log(2, success);
  console.log(3, ErrorMessage);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AVJLQDmVwZTYdiZHJMnURyIpj4i1VaaBhkEs8iHok6TAalZ1t37HCh8SD3aqPbOoIcfcNudLspGmAO73",
      }}
    >
      <div>
        <div className="wrapper">
          <div className="product-img">
            <img
              src="https://cdn.pixabay.com/photo/2021/08/15/06/54/sunflower-6546993_1280.jpg"
              alt="SunFlower"
              height="420"
              width="327"
            />
          </div>
          <div className="product-info">
            <div className="product-text">
              <h1>Sunflower</h1>
              <h2>POPULAR HOUSE PLANT</h2>
              <p>
                Sunflowers are usually tall annual or perennial plants.
                <br />
                Each "flower" is actually a
                <br />
                disc made up of tiny flowers,
                <br />
                to better attract pollinators.{" "}
              </p>
            </div>

            <div className="product-price-btn">
              <p>
                <span>$20</span>
              </p>
              <button type="submit" onClick={() => setShow(true)}>
                Buy now
              </button>
            </div>
          </div>
        </div>

        {show ? (
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        ) : null}
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
