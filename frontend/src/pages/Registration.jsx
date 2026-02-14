import React from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Registration() {
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { userdata, getCurrentUser } = useContext(userDataContext);
  let [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/registration",
        {
          name,
          email,
          password,
        },
        { withCredentials: true },
      );
      getCurrentUser();
      navigate("/");
      toast.success("User Registration Successful");
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("User Registration Failed");
      setLoading(false); // Added so loading state resets on error
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true },
      );
      console.log(result.data);
      getCurrentUser();
      navigate("/");
      toast.success("User Registration Successful");
    } catch (error) {
      console.log(error);
      toast.error("User Registration Failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center pb-10">
      {/* Header Section */}
      <div
        className="w-full py-6 flex items-center justify-start px-6 md:px-10 gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-10" src={Logo} alt="OneCart Logo" />
        <h1 className="text-2xl font-sans font-semibold tracking-wide">
          OneCart
        </h1>
      </div>

      {/* Title Section */}
      <div className="w-full flex items-center justify-center flex-col gap-2 my-6 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Create an Account
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          Welcome to OneCart, sign up to place your order
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md px-4 sm:px-0">
        <div className="w-full bg-[#00000040] border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col items-center p-6 md:p-8">
          {/* Google Signup Button */}
          <button
            onClick={googleSignup}
            className="w-full h-12 bg-white/10 hover:bg-white/20 transition-colors rounded-lg flex items-center justify-center gap-3 mb-6 font-medium border border-white/5"
          >
            <img src={google} alt="Google" className="w-5" />
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-3 mb-6 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-white/10"></div>
            <span>OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
            <input
              type="text"
              className="w-full h-12 border border-white/20 bg-transparent rounded-lg placeholder-gray-400 px-4 focus:outline-none focus:border-[#aaf5fa] transition-colors font-medium"
              placeholder="Username"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              type="email"
              className="w-full h-12 border border-white/20 bg-transparent rounded-lg placeholder-gray-400 px-4 focus:outline-none focus:border-[#aaf5fa] transition-colors font-medium"
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {/* Password Input Wrapper */}
            <div className="relative w-full flex items-center">
              <input
                type={show ? "text" : "password"}
                className="w-full h-12 border border-white/20 bg-transparent rounded-lg placeholder-gray-400 px-4 pr-12 focus:outline-none focus:border-[#aaf5fa] transition-colors font-medium"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div
                className="absolute right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? <IoEye size={20} /> : <IoEyeOutline size={20} />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#6060f5] hover:bg-[#4d4df0] transition-colors rounded-lg flex items-center justify-center mt-4 text-lg font-semibold shadow-lg disabled:opacity-70"
            >
              {loading ? <Loading /> : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-sm text-gray-300">
            Already have an account?{" "}
            <span
              className="text-[#aaf5fa] hover:text-white transition-colors font-semibold cursor-pointer ml-1"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
