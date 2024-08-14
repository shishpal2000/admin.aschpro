/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import logo from '../../Images/logo.png'
import axios from 'axios'
import { Alert } from "react-bootstrap";

const Login = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ email , setEmail  ] = useState("")
  const [ password , setPassword  ] = useState("")
  const [ error , setError  ] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data }  = await axios.post(`http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/auth/login`  , { email , password })
      localStorage.setItem("AdminToken" , data?.tokens?.accessToken)
      localStorage.setItem("AdminName" , data?.user?.name)
      localStorage.setItem("AdminId" , data?.user?._id)
      navigate("/dashboard");
      toast.success("Welcome Admin");
      setLoading(false);
    } catch (err) {
      console.log("Admin Login err => ", err);
      setLoading(false);
      setError(true)
    }
  };



  return (
    <>
      <div
        className="w-full h-screen flex flex-col justify-center items-center "
        style={{ backgroundColor: "#19376d" }}
      >
        <form className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 ">
          <img src={logo} alt='' className="logo" />
          <section className="py-2">
            {
              error ?
              <div className="dangerBox">
              <Alert variant="danger">Check Your Credentials</Alert>
              <i class="fa-solid fa-x" onClick={() => setError(false)}></i>
              </div>
               :""
            }
      
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
              <input
                type="email"
                placeholder="admin@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiOutlineMail className="text-xl " />
            </div>
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md mt-3">
              <input
                type={inputpass ? "text" : "password"}
                placeholder="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full  "
              />

              <span
                onClick={() => {
                  setPass(!pass);
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {pass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>

            <button
              type="submit"
              className="EcommerceAdminLogin"
              onClick={submitHandler}
            >
              {loading ? (
                <Oval height={30} secondaryColor="black" color="black" />
              ) : (
              "LOG IN"
              )}
            </button>
            {/* <br /> */}
            {/* <button
              type="button"
              onClick={() => navigate("/Vendorlogin")}
              className="EcommerceVendorLogin  "
            >
              E-Commerce Vendor Panel
            </button> */}
          </section>
        </form>
      </div>
    </>
  );
};

export default Login;
