import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {

  const validatePassword = async () => {
    if (document.getElementById('password').value !== document.getElementById('cpassword').value) {
      alert('Passwords dont match');
    }

    else {
      // e.preventDefault();
      const { name, email, password } = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json()
      // console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        history.push("/");
      }
      else {
        alert("User with this email already registered")
      }

    }
  }

  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { name, email, password } = credentials;
    validatePassword();



    // const response = await fetch("http://localhost:5000/api/auth/createuser", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ name, email, password })
    // });

    // const json = await response.json()
    // console.log(json);

    // if (json.success) {
    //   localStorage.setItem('token', json.authToken);
    //   history.push("/");
    // }
    // else {
    //   alert("User with this email already registered")
    // }


  }

  const onChange = (e) => {
    e.preventDefault()
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  const togglePassword = () => {

    let x = document.getElementById("password");

    if (x.type === "password") {
        x.type = "text";
    }
    else {
        x.type = "password";
    }

}

  return (
    <div className="container">
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" autoComplete="password" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <input type="checkbox" onClick={togglePassword}></input>Show Password
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" className="form-control" id="cpassword" name="cpassword" autoComplete="cpassword" onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
