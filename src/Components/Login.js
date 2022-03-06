import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        //   console.log(json);
        if (json.success) {
            //   save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            history.push("/");
            // alert("Logged in Successfully");

        }
        else {
            alert(json.error);
        }

    }

    const onChange = (e) => {
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
        <>
            <div>
                <form className="my-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" autoComplete="password" />
                    </div>

                    <div className="mb-3">
                        <input type="checkbox" onClick={togglePassword}></input>Show Password
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
            <div>
                <footer>
                    All rights reserved
                </footer>
            </div>
        </>

    )
}

export default Login
