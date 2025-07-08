import React from "react";
import riderImg from "../assets/agent-pending.png";
import { useForm } from "react-hook-form";
import UseAuth from "../hooks/UseAuth";
import { useLoaderData } from "react-router";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const serviceCenters = useLoaderData(); // JSON file

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // ✅ Watch selected region
  const selectedRegion = watch("region");

  // ✅ Extract unique regions
  const regions = [...new Set(serviceCenters.map((center) => center.region))];

  // ✅ Filter districts based on selected region
  const districts = serviceCenters
    .filter((center) => center.region === selectedRegion)
    .map((center) => center.district);
  const uniqueDistricts = [...new Set(districts)];

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    console.log("Rider Application Data:", riderData);

    axiosSecure.post("/riders", riderData).then((res) => {
      console.log(res.data.insertedId);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application is pending approval.",
        });
      }
    });

    // reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 rounded-2xl">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-2">
        Be a Rider
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            Tell us about yourself
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Name"
                // value={user?.displayName || ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="label">Your Age</label>
              <input
                type="number"
                {...register("age", { required: true, min: 18 })}
                className="input input-bordered w-full"
                placeholder="Your Age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">Valid age is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">Your Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Email"
                value={user?.email || ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* Region Dropdown */}
            <div>
              <label className="label">Your Region</label>
              <select
                {...register("region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm">Region is required</p>
              )}
            </div>

            {/* District Dropdown */}
            <div>
              <label className="label">Your District</label>
              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your district</option>
                {uniqueDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">District is required</p>
              )}
            </div>

            {/* NID */}
            <div>
              <label className="label">NID No</label>
              <input
                type="text"
                {...register("nid", { required: true })}
                className="input input-bordered w-full"
                placeholder="NID"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">NID is required</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="label">Contact</label>
              <input
                type="tel"
                {...register("contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">Contact is required</p>
              )}
            </div>

            {/* ✅ New: Bike Model */}
            <div>
              <label className="label">Bike Model</label>
              <input
                type="text"
                {...register("bike_model", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. Honda CB150"
              />
              {errors.bike_model && (
                <p className="text-red-500 text-sm">Bike model is required</p>
              )}
            </div>

            {/* ✅ New: Bike Registration No */}
            <div>
              <label className="label">Registration No</label>
              <input
                type="text"
                {...register("bike_registration", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. DHA-1234"
              />
              {errors.bike_registration && (
                <p className="text-red-500 text-sm">
                  Registration no is required
                </p>
              )}
            </div>
          </div>

          {/* Warehouse Selection */}
          <div>
            <label className="label">Which warehouse you want to work?</label>
            <select
              {...register("warehouse", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select warehouse</option>
              <option value="Uttara">Uttara</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Mohakhali">Mohakhali</option>
              <option value="Khilgaon">Khilgaon</option>
            </select>
            {errors.warehouse && (
              <p className="text-red-500 text-sm">
                Warehouse selection is required
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-success w-full mt-4">
            Submit
          </button>
        </form>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={riderImg}
            alt="Rider Illustration"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
