import React from "react";
import riderImg from "../assets/agent-pending.png"; // adjust path as needed
import { useForm } from "react-hook-form";

const BeARider = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Rider Application Data:", data);
    // You can POST to backend API here
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 rounded-2xl ">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-2">Be a Rider</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        From personal packages to business shipments — we deliver on time, every time.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">Tell us about yourself</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
            </div>
            <div>
              <label className="label">Your Age</label>
              <input
                type="number"
                {...register("age", { required: true, min: 18 })}
                className="input input-bordered w-full"
                placeholder="Your age"
              />
              {errors.age && <p className="text-red-500 text-sm">Valid age is required</p>}
            </div>
            <div>
              <label className="label">Your Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Email"
              />
              {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
            </div>
            <div>
              <label className="label">Your Region</label>
              <select {...register("region", { required: true })} className="select select-bordered w-full">
                <option value="">Select your region</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Barishal">Barishal</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
              {errors.region && <p className="text-red-500 text-sm">Region is required</p>}
            </div>
            <div>
              <label className="label">NID No</label>
              <input
                type="text"
                {...register("nid", { required: true })}
                className="input input-bordered w-full"
                placeholder="NID"
              />
              {errors.nid && <p className="text-red-500 text-sm">NID is required</p>}
            </div>
            <div>
              <label className="label">Contact</label>
              <input
                type="tel"
                {...register("contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact"
              />
              {errors.contact && <p className="text-red-500 text-sm">Contact is required</p>}
            </div>
          </div>

          <div>
            <label className="label">Which warehouse you want to work?</label>
            <select {...register("warehouse", { required: true })} className="select select-bordered w-full">
              <option value="">Select warehouse</option>
              <option value="Uttara">Uttara</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Mohakhali">Mohakhali</option>
              <option value="Khilgaon">Khilgaon</option>
            </select>
            {errors.warehouse && <p className="text-red-500 text-sm">Warehouse selection is required</p>}
          </div>

          <button type="submit" className="btn btn-success w-full mt-4">
            Submit
          </button>
        </form>

        {/* Image Section */}
        <div className="flex justify-center">
          <img src={riderImg} alt="Rider Illustration" className="max-w-xs md:max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
