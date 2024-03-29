import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Cred = ({type}:{type:"signup" | "signin"}) => {
     const navigate = useNavigate();
     const [postInputs, setPostInputs] = useState({
          name: "",
          email: "",
          password: ""
      });

      async function sendReq() {
          try {
              const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
              const jwt = response.data;
              localStorage.setItem("token", jwt);
              navigate("/blogs");
          } catch(e) {
              alert("Error while signing up")
          }
      }




     return (<div className="h-screen flex justify-center flex-col ">
          <div className="flex justify-center">
<div className="px-10">
               <div>
<div className=" text-4xl font-bold text-left mt-4 quotefont">{type==="signup"?"Create an account":"Login to your account"}</div>
<div className="text-slate-400">{type==="signup"?"Already have an account?":"Don't have an account?"} <Link className="pl-1 underline"to={type === "signup" ? "/signin" : "/signup"}> {type === "signup" ? "Sign in" : "Sign up"}</Link>
</div>
     </div>
     <div className="pt-6">
          
         
<LabelledInput label="Username" placeholder="Enter your username" onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })} />
<LabelledInput label="Email" placeholder="a@example.com" onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} />
<LabelledInput label="Password" type="password" placeholder="" onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} />
<button  onClick={sendReq} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
</div>
</div>
</div>
     </div>)
}



interface LabelinputType{
      label:string;
      placeholder:string;
      onChange:(e: ChangeEvent<HTMLInputElement>)=>void;
      type?: string; 
}

function LabelledInput({ label, placeholder, onChange, type }: LabelinputType) { // Pass type as a parameter
      return <div>
           <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
           <input onChange={onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
      </div>
 }