import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formValues;

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    console.log(formValues);
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/register`,
        formValues
      );

      //console.log(response);
      if (response.status === 201) {
        // status: 201, statusText: "Created"
        localStorage.setItem('token', response.data.token);
        setAuth(true);
        toast.success('Registered Successfully');
      } else {
        setAuth(false);
        toast.error(response.data);
      }
    } catch (err) {
      console.log(err.message); // 401
      toast.error(err.message);
    }
  };

  return (
    <>
      <h1 className="mt-5 text-center">Register</h1>
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
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </>
  );
};

export default Register;
