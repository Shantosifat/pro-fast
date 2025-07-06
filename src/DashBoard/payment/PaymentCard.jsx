import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../pages/Shared/Loading";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

const PaymentCard = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id: parcelId } = useParams();
  const navigate = useNavigate();
  //   console.log(parcelId);
  const { isPending, data: parcelData = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loading></Loading>;
  }
  // console.log(parcelData);
  const amount = parcelData.cost;
  const amountinCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    // step-1: validate the card(card thik ase ki na)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }

    //step-2: create payment intent for db
    const res = await axiosSecure.post("/create-payment-intent", {
      amountinCents,
      currency: "৳",
    });
    console.log(" res from intent", res);
    // Confirm the payment on the client
    const clientSecret = res.data.clientSecret;

    // step-3: confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    if (result.error) {
      setError(result.error.message);
    } else {
      // Payment succeeded
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment success");
        console.log(result);
        const transactionId = result.paymentIntent.id;
        // step 4 : mark parcel paid also create payment history
        const paymentData = {
          parcelId,
          email: user.email,
          // userName: user.displayName,
          // paymentIntentId: result.paymentIntent.id,
          amount,
          transactionId: transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
        };
        const paymentRes = await axiosSecure.post("/payments", paymentData);
        if (paymentRes.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful",
            html: `
    <p>Your payment has been recorded successfully!</p>
    <p><strong>Transaction ID:</strong> ${transactionId}</p>
  `,
            confirmButtonText: "Go to My Parcels",
          });
          // redirect to my parcels
          navigate("/dashBoard/myParcels");
        }
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-6 rounded-xl mt-5 max-w-md shadow-md w-full mx-auto"
      >
        <CardElement className="border p-3 rounded" />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe}
        >
          Pay ৳{amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </div>
  );
};

export default PaymentCard;
