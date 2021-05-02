import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";

// import Home from "./component/Home/Home";


export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        try {
            history.push("/");
        } catch(e) {
            alert(e.message);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    {/* <label className="custom-control-label" htmlFor="customCheck1">Remember me</label> */}
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block"
            >Submit</button>
            <p className="forgot-password text">
                <a href="/sign-up">Sign Up?</a>
            </p>
        </form>
    );
}