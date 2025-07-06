import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUSerProfile } = UseAuth();

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
        // update user profile in db

        // update userprofile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUSerProfile(userProfile)
          .then(() => {
            console.log("profile pic & name updated ");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    const imageURL = `https://api.imgbb.com/1/upload?expiration=600&key=${
      import.meta.env.VITE_IMAGE_Key
    }`;
    const res = await axios.post(imageURL, formData);
    setProfilePic(res.data.data.url);
  };
  return (
    <div>
      <h1 className="text-5xl font-bold">Create an Account!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-3xl">SignUp</legend>
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="your name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600 mt-2">Name is required</p>
          )}

          {/* image */}
          <label className="label">Photo</label>
          <input
            onChange={handleImageUpload}
            type="file"
            className="input"
            placeholder="Email"
          />
          {/* email */}
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
          {/* password */}
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
          <p className="my-2">
            Already have an Account? Go To{" "}
            <Link className="btn-link text-cyan-400" to="/login">
              LogIn
            </Link>
          </p>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Signup;
