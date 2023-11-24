import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const IncomeRecords = () => {
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const responseUser = await axios.get(`${API_URL}/api/user/fetchuser`, {
          params: {
            email: email,
          },
        });
        const userid = responseUser.data._id;

        const responseIncome = await axios.get(`${API_URL}/api/track/get-income/${userid}`);
        setIncomeRecords(responseIncome.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleDelete = async (incomeId) => {
    try {
      await axios.delete(`${API_URL}/api/track/delete-income/${incomeId}`);
      setIncomeRecords((prevRecords) => prevRecords.filter((record) => record._id !== incomeId));
    } catch (error) {
      console.error('Error deleting income record:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Income Records</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { incomeRecords && incomeRecords.length>0 ? ( incomeRecords.map((record) => (
          <div key={record._id} className="bg-white rounded-md p-4 shadow-md">
            <h3 className="text-lg text-deep-blue font-playfair font-semibold mb-2">{record.title}</h3>
            <p className="text-dark-grey mb-2">{`Amount: ${record.amount}`}</p>
            <p className="text-dark-grey mb-2">{`Date: ${new Date(record.date).toLocaleDateString()}`}</p>
            <p className="text-dark-grey mb-2">{`Category: ${record.category}`}</p>
            <p className="text-dark-grey">{`Description: ${record.description}`}</p>
            <div className="flex justify-between mt-4">
                <button
                  className="bg-deep-red text-white px-4 py-2 rounded hover:bg-yellow"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              </div>
          </div>
        ))) : (
            <p>No income records available.</p>
          )}
      </div>
    </div>
  );
};

export default IncomeRecords;
