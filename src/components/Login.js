import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    console.log(formValues);
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/login`,
        formValues
      );

      //console.log(response);
      if (response.status === 200) {
        // status: 200, statusText: "OK"
        localStorage.setItem('token', response.data.token);
        setAuth(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />

        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
