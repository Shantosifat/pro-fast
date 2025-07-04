import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import {
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiXCircle,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const SendParcelForm = () => {
  const { user } = UseAuth();
  const serviceCenters = useLoaderData();
  const [costData, setCostData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const axiosSecure = UseAxiosSecure();

  // Unique regions
  const uniqueRegions = [...new Set(serviceCenters.map((item) => item.region))];

  const getDistrictsByRegion = (region) => {
    return [
      ...new Set(
        serviceCenters
          .filter((item) => item.region === region)
          .map((item) => item.district)
      ),
    ];
  };

  const getCentersByDistrict = (region, district) => {
    return [
      ...new Set(
        serviceCenters
          .filter(
            (item) => item.region === region && item.district === district
          )
          .map((item) => item.city) // city as service center
      ),
    ];
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const senderDistrict = watch("senderDistrict");
  const receiverRegion = watch("receiverRegion");
  const receiverDistrict = watch("receiverDistrict");

  const onSubmit = (data) => {
    // Calculate cost & breakdown
    let cost = 50;
    let breakdown = ["Base delivery charge: ৳50"];

    if (data.parcelType === "non-document") {
      const weightCost = (data.weight || 0) * 20;
      cost += weightCost;
      breakdown.push(`Weight charge (৳20/kg): ৳${weightCost}`);
    }
    if (data.senderRegion !== data.receiverRegion) {
      cost += 30;
      breakdown.push("Inter-region charge: ৳30");
    }

    // Order info
    const orderInfo = {
      ...data,
      created_by: user.email,
      payment_status: 'unpaid',
      delivery_status: 'not-collected',
      trackingId: `PKG-${uuidv4().slice(0, 8).toUpperCase()}`, // e.g. PKG-1A2B3C4D
      orderDate: new Date().toISOString(),
    };
    console.log(orderInfo);

    axiosSecure.post('/parcels', orderInfo).then(res=>{
      console.log(res.data)
      if(res.data.insertedId){
        console.log('baby');
      }
    })

    // Set modal data
    setCostData({ total: cost, breakdown, form: data, orderInfo });
    setShowModal(true);
    setOrderConfirmed(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-2 text-center">Send a Parcel</h1>
      <p className="mb-6 text-gray-600 text-center">
        Door to Door Delivery — provide parcel, sender & receiver info
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Parcel Info */}
        <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>

        <label className="block mb-1 font-medium">Type</label>
        <select
          {...register("parcelType", { required: "Parcel type is required" })}
          className="w-full mb-3 border rounded px-3 py-2"
        >
          <option value="">Select Type</option>
          <option value="document">Document</option>
          <option value="non-document">Non-Document</option>
        </select>
        {errors.parcelType && (
          <p className="text-red-600 mb-3">{errors.parcelType.message}</p>
        )}

        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Parcel Title"
          className="w-full mb-3 border rounded px-3 py-2"
        />
        {errors.title && (
          <p className="text-red-600 mb-3">{errors.title.message}</p>
        )}

        {parcelType === "non-document" && (
          <input
            type="number"
            step="any"
            {...register("weight", {
              required: "Weight is required for non-document",
              min: { value: 0, message: "Weight cannot be negative" },
            })}
            placeholder="Weight (kg)"
            className="w-full mb-3 border rounded px-3 py-2"
          />
        )}
        {errors.weight && (
          <p className="text-red-600 mb-3">{errors.weight.message}</p>
        )}

        {/* Sender & Receiver side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Sender Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>

            <input
              {...register("senderName", { required: "Sender name is required" })}
              defaultValue={user?.displayName}
              placeholder="Sender Name"
              className="w-full mb-3 border rounded px-3 py-2"
            />
            {errors.senderName && (
              <p className="text-red-600 mb-3">{errors.senderName.message}</p>
            )}

            <input
              {...register("senderContact", { required: "Sender contact is required" })}
              placeholder="Sender Contact"
              className="w-full mb-3 border rounded px-3 py-2"
            />
            {errors.senderContact && (
              <p className="text-red-600 mb-3">{errors.senderContact.message}</p>
            )}

            <select
              {...register("senderRegion", { required: "Sender region is required" })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.senderRegion && (
              <p className="text-red-600 mb-3">{errors.senderRegion.message}</p>
            )}

            <select
              {...register("senderDistrict", { required: "Sender district is required" })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
              disabled={!senderRegion}
            >
              <option value="">Select District</option>
              {senderRegion &&
                getDistrictsByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
            {errors.senderDistrict && (
              <p className="text-red-600 mb-3">{errors.senderDistrict.message}</p>
            )}

            {/* <select
              {...register("senderCenter", { required: "Sender service center is required" })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
              disabled={!senderDistrict}
            >
              <option value="">Select Center</option>
              {senderRegion &&
                senderDistrict &&
                getCentersByDistrict(senderRegion, senderDistrict).map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
            </select> */}
            {/* {errors.senderCenter && (
              <p className="text-red-600 mb-3">{errors.senderCenter.message}</p>
            )} */}

            <textarea
              {...register("senderAddress", { required: "Sender address is required" })}
              placeholder="Sender Address"
              rows={2}
              className="w-full mb-3 border rounded px-3 py-2"
            />
            {errors.senderAddress && (
              <p className="text-red-600 mb-3">{errors.senderAddress.message}</p>
            )}

            <textarea
              {...register("senderInstruction", { required: "Pickup instruction is required" })}
              placeholder="Pickup Instruction"
              rows={2}
              className="w-full mb-3 border rounded px-3 py-2"
            />
            {errors.senderInstruction && (
              <p className="text-red-600 mb-3">{errors.senderInstruction.message}</p>
            )}
          </div>

          {/* Receiver Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>

            <input
              {...register("receiverName", { required: "Receiver name is required" })}
              placeholder="Receiver Name"
              className="w-full mb-3 border rounded px-3 py-2"
            />
            {errors.receiverName && (
              <p className="text-red-600 mb-3">{errors.receiverName.message}</p>
            )}

            <input
              {...register("receiverContact", { required: "Receiver contact is required" })}
              placeholder="Receiver Contact"
              className="w-full mb-3 border rounded px-3 py-2"
            />
            {errors.receiverContact && (
              <p className="text-red-600 mb-3">{errors.receiverContact.message}</p>
            )}

            <select
              {...register("receiverRegion", { required: "Receiver region is required" })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.receiverRegion && (
              <p className="text-red-600 mb-3">{errors.receiverRegion.message}</p>
            )}

            <select
              {...register("receiverDistrict", { required: "Receiver district is required" })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
              disabled={!receiverRegion}
            >
              <option value="">Select District</option>
              {receiverRegion &&
                getDistrictsByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
            {errors.receiverDistrict && (
              <p className="text-red-600 mb-3">{errors.receiverDistrict.message}</p>
            )}

            {/* <select
              {...register("receiverCenter", { required: "Receiver service center is required" })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
              disabled={!receiverDistrict}
            >
              <option value="">Select Center</option>
              {receiverRegion &&
                receiverDistrict &&
                getCentersByDistrict(receiverRegion, receiverDistrict).map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
            </select>
            {errors.receiverCenter && (
              <p className="text-red-600 mb-3">{errors.receiverCenter.message}</p>
            )} */}

            <textarea
              {...register("receiverAddress", { required: "Receiver address is required" })}
              placeholder="Receiver Address"
              rows={2}
              className="w-full mb-3 border rounded px-3 py-2"
            />
            {errors.receiverAddress && (
              <p className="text-red-600 mb-3">{errors.receiverAddress.message}</p>
            )}

            <textarea
              {...register("receiverInstruction", { required: "Delivery instruction is required" })}
              placeholder="Delivery Instruction"
              rows={2}
              className="w-full mb-3 border rounded px-3 py-2"
            />
            {errors.receiverInstruction && (
              <p className="text-red-600 mb-3">{errors.receiverInstruction.message}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="text-center ml-[445px] p-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition mt-6"
        >
          Submit
        </button>
      </form>

      {/* Cost Modal */}
      {showModal && costData && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="text-green-500 text-4xl" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
              Delivery Cost Summary
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              Here's the estimated cost for your parcel
            </p>

            {/* Cost Breakdown */}
            <ul className="mb-4 text-gray-700 text-sm space-y-2">
              {costData.breakdown.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="text-center text-lg font-semibold text-green-600 mb-6">
              Total Cost: ৳{costData.total}
            </div>

            {/* Order info */}
            {orderConfirmed && (
              <div className="mb-6 text-center text-gray-700">
                <p>
                  <strong>Tracking ID:</strong> {costData.orderInfo.trackingId}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(costData.orderInfo.orderDate).toLocaleString()}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              {!orderConfirmed ? (
                <>
                  <button
                    onClick={() => {
                      setOrderConfirmed(true);
                      Swal.fire({
                        title: "Order Confirmed!",
                        html: `
                          Your parcel order has been placed.<br/>
                          Tracking ID: <strong>${costData.orderInfo.trackingId}</strong><br/>
                          Order Date: <strong>${new Date(
                            costData.orderInfo.orderDate
                          ).toLocaleString()}</strong>
                        `,
                        icon: "success",
                        confirmButtonColor: "#2563eb",
                        confirmButtonText: "OK",
                      });
                      // TODO: Save order to backend here if needed
                    }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
                  >
                    <FiCheckCircle /> Confirm Order
                  </button>

                  <button
                    onClick={() => setShowModal(false)}
                    className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-100 transition"
                  >
                    <FiXCircle /> Edit Order
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      // Navigate to payment page or payment logic here
                    }}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                  >
                    <FiCreditCard /> Proceed to Payment
                  </button>

                  <button
                    onClick={() => setShowModal(false)}
                    className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-100 transition"
                  >
                    <FiClock /> Later
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendParcelForm;
