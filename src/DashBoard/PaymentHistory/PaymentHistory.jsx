import React from "react";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../pages/Shared/Loading";

const PaymentHistory = () => {
  const { user } = UseAuth();

  const axiosSecure = UseAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loading></Loading>;
  }
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <table className="table w-full border rounded-lg shadow-md">
        <thead className="bg-amber-700 text-gray-100">
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Transaction ID</th>
            <th>Payment Method</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <tr key={payment._id} className="hover">
                <td>{index + 1}</td>
                <td>{payment.parcelId}</td>
                <td className="text-xs break-all">{payment.transactionId}</td>
                <td>
                  {Array.isArray(payment.paymentMethod)
                    ? payment.paymentMethod.join(", ")
                    : payment.paymentMethod}
                </td>
                <td>৳ {payment.amount?.toFixed(2)}</td>
                <td>
                  <span className="text-green-600 font-semibold">
                    {payment.status}
                  </span>
                </td>
                <td>{new Date(payment.paid_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
