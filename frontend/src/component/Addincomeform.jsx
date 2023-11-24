
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
// import { Form } from 'react-router-dom';

const AddIncomeForm = ({ onClose }) => {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');
    var userid = "";
    
    try{
      const res = await axios.get(`${API_URL}/api/user/fetchuser`, {
        params: {
          email: email,
        } , });
      if(res.data && res.data._id){
        userid = res.data._id;
       }
    }catch(e){
        console.log(e);
    }
    try{
        const response = await axios.post(`${API_URL}/api/track/add-income`, {
          title,
          amount,
          date,
          category,
          description,
          userid
        });
        if (response.data === "exist") {
          alert("Income already added");
        } else if (response.data === "notexist") {
          // success
          alert("Income successfully added");
          history("/userpage");
        }      
      }
      catch(e){
          console.log(e);
          alert("Invalid Information");
      }
    onClose();
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-4 md:w-3/4">
      <h2 className="text-xl font-semibold mb-4 text-black ">Add Income</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 text-black rounded-md p-2 mb-4 w-full"
          placeholder="Enter income title..."
          required
        />

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-md text-black p-2 mb-4 w-full"
          placeholder="Enter income amount..."
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md text-black p-2 mb-4 w-full"
          required
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-black mb-4 w-full"
          placeholder="Enter income category..."
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md text-black p-2 mb-4 w-full"
          placeholder="Enter income description..."
        />

        <button
          type="submit"
          className="bg-green-500 text-white hover:bg-dark-grey py-2 rounded-md w-full"
        >
          Add Income
        </button>
      </form>
    </div>
  );
};

export default AddIncomeForm;
