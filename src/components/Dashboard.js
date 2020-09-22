import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dashboard`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        });

        if (response.status === 200) {
          setName(response.data.user_name);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out Successfully');
  };

  return (
    <div>
      <h1>Dashboard {name}</h1>
      <button onClick={(e) => logout(e)} className="btn btn-primary">
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
