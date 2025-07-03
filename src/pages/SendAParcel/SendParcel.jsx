import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const SendParcelForm = () => {
  const { user } = UseAuth();
  const serviceCenters = useLoaderData();
  const [costData, setCostData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Extract unique regions
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
          .map((item) => item.city) // using city as service center
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

  const calculateCost = (data) => {
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
    return { total: cost, breakdown };
  };

  const onSubmit = (data) => {
    const costDetails = calculateCost(data);
    setCostData({ ...costDetails, form: data });
    setShowModal(true);
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
          {...register("parcelType", { required: true })}
          className="w-full mb-3 border rounded px-3 py-2"
        >
          <option value="">Select Type</option>
          <option value="document">Document</option>
          <option value="non-document">Non-Document</option>
        </select>

        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Parcel Title"
          className="w-full mb-3 border rounded px-3 py-2"
        />
        {parcelType === "non-document" && (
          <input
            type="number"
            step="any"
            {...register("weight", {
              min: { value: 0, message: "Weight cannot be negative" },
            })}
            placeholder="Weight (kg)"
            className="w-full mb-3 border rounded px-3 py-2"
          />
        )}

        {/* Sender & Receiver Info Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Sender Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>

            <input
              {...register("senderName", { required: true })}
              defaultValue={user?.displayName}
              placeholder="Sender Name"
              className="w-full mb-3 border rounded px-3 py-2"
            />
            <input
              {...register("senderContact", { required: true })}
              placeholder="Sender Contact"
              className="w-full mb-3 border rounded px-3 py-2"
            />

            <select
              {...register("senderRegion", { required: true })}
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
              <p className="text-red-600 text-sm mb-3">
                {errors.senderRegion.message}
              </p>
            )}

            <select
              {...register("senderDistrict", { required: true })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
              disabled={!senderRegion}
            >
              <option value="">Select District</option>
              {getDistrictsByRegion(senderRegion).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <select
              {...register("senderCenter", { required: true })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
              disabled={!senderDistrict}
            >
              <option value="">Select Center</option>
              {getCentersByDistrict(senderRegion, senderDistrict).map(
                (center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                )
              )}
            </select>

            <textarea
              {...register("senderAddress", { required: true })}
              placeholder="Sender Address"
              rows={2}
              className="w-full mb-3 border rounded px-3 py-2"
            />
            <textarea
              {...register("senderInstruction", { required: true })}
              placeholder="Pickup Instruction"
              rows={2}
              className="w-full mb-3 border rounded px-3 py-2"
            />
          </div>

          {/* Receiver Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>

            <input
              {...register("receiverName", { required: true })}
              placeholder="Receiver Name"
              className="w-full mb-3 border rounded px-3 py-2"
            />
            <input
              {...register("receiverContact", { required: true })}
              placeholder="Receiver Contact"
              className="w-full mb-3 border rounded px-3 py-2"
            />

            <select
              {...register("receiverRegion", { required: true })}
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
              <p className="text-red-600 text-sm mb-3">
                {errors.senderRegion.message}
              </p>
            )}

            <select
              {...register("receiverDistrict", { required: true })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
              disabled={!receiverRegion}
            >
              <option value="">Select District</option>
              {getDistrictsByRegion(receiverRegion).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <select
              {...register("receiverCenter", { required: true })}
              className="w-full mb-3 border rounded px-3 py-2 text-primary"
              disabled={!receiverDistrict}
            >
              <option value="">Select Center</option>
              {getCentersByDistrict(receiverRegion, receiverDistrict).map(
                (center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                )
              )}
            </select>

            <textarea
              {...register("receiverAddress", { required: true })}
              placeholder="Receiver Address"
              rows={2}
              className="w-full mb-3 border rounded px-3 py-2"
            />
            <textarea
              {...register("receiverInstruction", { required: true })}
              placeholder="Delivery Instruction"
              rows={2}
              className="w-full mb-3 border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition mt-6"
        >
          Submit
        </button>
      </form>

      {/* Cost Modal */}

{showModal && costData && (
  <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
      <div className="flex justify-center mb-4">
        <FiCheckCircle className="text-green-500 text-4xl" />
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Delivery Cost Summary
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        Here's the estimated cost for this parcel
      </p>

      <ul className="mb-4 text-gray-700 text-sm space-y-1">
        {costData.breakdown.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 text-blue-600">•</span> {item}
          </li>
        ))}
      </ul>

      <div className="text-center text-lg font-semibold text-green-600 mb-6">
        Total Cost: ৳{costData.total}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
        >
          <FiCheckCircle className="text-white" /> Confirm
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <FiXCircle /> Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default SendParcelForm;
