import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AVJLQDmVwZTYdiZHJMnURyIpj4i1VaaBhkEs8iHok6TAalZ1t37HCh8SD3aqPbOoIcfcNudLspGmAO73",
      }}
    >
      <PayPalButtons style={{ layout: "horizontal" }} />
      
    </PayPalScriptProvider>
  );
}

export default App;
