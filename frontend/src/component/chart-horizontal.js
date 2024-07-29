import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { API_URL } from '../config';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Expense and Income Chart',
    },
  },
};

const HorizontalChart = () => {
  const [data, setData] = useState({
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Expense',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Income',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });
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
        const expenseUrl = `${API_URL}/api/track/getexpense/${userid}`;
        const incomeUrl = `${API_URL}/api/track/get-income/${userid}`;

        try {
          const [expenseResponse, incomeResponse] = await Promise.all([
            fetch(expenseUrl),
            fetch(incomeUrl),
          ]);

          const [expenseData, incomeData] = await Promise.all([
            expenseResponse.json(),
            incomeResponse.json(),
          ]);

          const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const expenseValues = expenseData.map((expense) => expense.amount);
          const incomeValues = incomeData.map((income) => income.amount);
          console.log(expenseValues);
          setData((prevData) => ({
            labels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: expenseValues,
              },
              {
                ...prevData.datasets[1],
                data: incomeValues,
              },
            ],
          }));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: '80%', height: '50%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalChart;