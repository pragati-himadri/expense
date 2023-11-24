// import { Link } from "react-router-dom";
// import { API_URL } from '../../config';
import React, { useState } from 'react';
import AddIncomeForm from '../../component/Addincomeform'; 
import AddExpenseForm from '../../component/Addexpenseform'; 
import IncomeRecords from '../../component/showincome'; 
import ExpenseRecords from '../../component/showexpense'; 
import image from '../../images/imagebguser.avif';

export default function Userpage() {
  const userEmail = localStorage.getItem('userEmail');
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeRecords, setShowIncomeRecords] = useState(false);
  const [showExpenseRecords, setShowExpenseRecords] = useState(false);

  const handleShowIncomeForm = () => {
    setShowIncomeForm(true);
    setShowExpenseForm(false);
    setShowIncomeRecords(false);
    setShowExpenseRecords(false);
  };

  const handleShowExpenseForm = () => {
    setShowIncomeForm(false);
    setShowExpenseForm(true);
    setShowIncomeRecords(false);
    setShowExpenseRecords(false);
  };

  const handleShowIncomeRecords = () => {
    setShowIncomeForm(false);
    setShowExpenseForm(false);
    setShowIncomeRecords(true);
    setShowExpenseRecords(false);
  };

  const handleShowExpenseRecords = () => {
    setShowIncomeForm(false);
    setShowExpenseForm(false);
    setShowIncomeRecords(false);
    setShowExpenseRecords(true);
  };

  return (
    <>
      {userEmail ? (
        <div className="mt-32 flex flex-col items-center justify-center space-y-4 "  >
            <div className='md:w-3/5 m-4 md:h-full mb-4' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover',backgroundposition: 'center' }}  >
                <div className='m-4'>
          <h3 className="text-deep-blue font-playfair text-700 text-2xl italic mb-4">
            'Every penny saved is a step towards financial freedom.'
          </h3>
          <h2 className="text-2xl font-bold mb-4 text-deep-blue">Add Transaction</h2>
          <div className="grid items-center justify-between space-x-4">
            <button
              className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
              onClick={handleShowIncomeForm}
            >
              Add Income
            </button>
            <button
              className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
              onClick={handleShowIncomeRecords}
            >
              Show Record of Income
            </button>
          </div>
          <div className="grid items-center justify-between space-x-4">
            <button
              className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
              onClick={handleShowExpenseForm}
            >
              Add Expense
            </button>
            <button
              className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
              onClick={handleShowExpenseRecords}
            >
              Show Record of Expenses
            </button>
          </div>
          </div>
          </div>

          {showIncomeForm && <AddIncomeForm onClose={() => setShowIncomeForm(false)} />}
          {showExpenseForm && <AddExpenseForm onClose={() => setShowExpenseForm(false)} />}
          {showIncomeRecords && <IncomeRecords />} {/* Create an IncomeRecords component */}
          {showExpenseRecords && <ExpenseRecords />} {/* Create an ExpenseRecords component */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
