import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCard from "./PaymentCard";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_Key);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentCard></PaymentCard>
    </Elements>
  );
};

export default Payment;
