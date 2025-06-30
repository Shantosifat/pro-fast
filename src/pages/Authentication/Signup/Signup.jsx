import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link } from "react-router";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = UseAuth();

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (
    <div>
      <h1 className="text-5xl font-bold">Create an Account!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-3xl">SignUp</legend>

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600 mt-2">Email is required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600 mt-2">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600 mt-2">
              Password must be 6 character or longer
            </p>
          )}
          <button className="btn btn-success mt-4">SignUp</button>
                    <p className="my-2">Already have an Account? Go To <Link className="btn-link text-cyan-400" to='/login'>LogIn</Link></p>

        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Signup;
