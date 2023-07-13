"use client";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import dynamic from "next/dynamic";
dynamic(() => import('react-toastify/dist/ReactToastify.min.css'));


function AddComp({ income }) {
  const GlobalContext = useGlobalContext();
  const { addInExp } = GlobalContext;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const type = income ? "income" : "expense";

  const functionAdd = async (e) => {
    e.preventDefault();
    let category = document.querySelector("#category").value;   
    
    const fetchReq = await addInExp(title, type, category, amount, desc);
    if(fetchReq.Error) return toast.error(fetchReq.Error);
    
    toast.success(fetchReq.success);
      setTitle("");
      setAmount(0);
      setDesc("");
      document.querySelector("#category").value = "Select:";
  };

  return (
    <form className="text-xs md:text-sm bg-gray-100 flex items-center h-[60vh] lg:h-[80vh] w-full md:w-[85vw] lg:w-[30vw] flex-col mx-auto rounded space-y-6 lg:space-y-10 p-5 inputContainer">
   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <h1 className="font-bold text-sm lg:text-xl">
        {income ? "Add Incomes" : "Add Expenses"}
      </h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={`Enter ${type} title`}
        className="p-2 rounded  border-none outline-none w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[20vw]"
        />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={`Enter ${type} amount`}
        className="p-2 rounded border-none outline-none w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[20vw]"
        />
      <select
        defaultValue={"Select:"}
        name="category"
        id="category"
        className="p-2 rounded border-none outline-none w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[20vw]"
        >
        <option disabled className="text-gray-400">
          Select:
        </option>
        {income ? (
          <>
            <option value="Salary">Salary</option>
            <option value="Freelancing">Freelancing</option>
            <option value="WebDevelopment">Web Development</option>
            <option value="Designing">Designing</option>
            <option value="PartTime">Part Time</option>
          </>
        ) : (
          <>
            <option value="Fees">Fees</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
            <option value="Travelling">Travelling</option>
            <option value="Insurance">Insurance</option>
          </>
        )}
        <option value="others">others</option>
      </select>

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description..."
        className="p-2 rounded border-none outline-none lg:h-24 w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[20vw]"
        />
      <button
        onClick={functionAdd}
        className="p-3 bg-white w-24 rounded hover:bg-cyan-200 transition-all ease-in"
        >
        Add
      </button>
    </form>
  );
}

export default AddComp;
