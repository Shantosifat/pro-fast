import React from "react";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">My Parcels ({parcels.length})</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow rounded">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Title</th>

              <th className="py-2 px-4 border">Receiver</th>
              <th className="py-2 px-4 border">Order Time</th>
              <th className="py-2 px-4 border">Payment</th>
              <th className="py-2 px-4 border">Delivery</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="text-sm text-gray-700">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border">{parcel.title}</td>

                <td className="py-2 px-4 border">{parcel.receiverName}</td>
                <td className="py-2 px-4 border">
                  {new Date(parcel.orderTime).toLocaleString()}
                </td>

                {/* Payment Status Badge */}
                <td className="py-2 px-4 border">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      parcel.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>

                {/* Delivery Status */}
                <td className="py-2 px-4 border capitalize">
                  {parcel.delivery_status}
                </td>

                {/* Actions */}
                <td className="py-2 px-4 border space-x-2">
                  <button className="btn btn-sm bg-blue-100 text-blue-700 hover:bg-blue-200">
                    View
                  </button>

                  {parcel.payment_status === "unpaid" && (
                    <button className="btn btn-sm bg-green-100 text-green-700 hover:bg-green-200">
                      Pay
                    </button>
                  )}

                  <button className="btn btn-sm bg-red-100 text-red-700 hover:bg-red-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
