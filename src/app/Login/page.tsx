"use client"

import React, { useEffect } from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/navigation'

export default function Login(onData:any) {
    const router = useRouter()

    const [User, setUser] = useState({
        Email: '',
        Password: '',
        IsVisible: false
    })

    const [errors, setErrors] = useState({
        EmailErr: "",
        PasswordErr: ""
    })

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const changeUserDate = (e: any) => {
        if (e.target.name === "Email") {
            setUser({
                ...User,
                Email: e.target.value
            })

            setErrors({
                ...errors,
                EmailErr: e.target.value.length === 0
                    ? "This Field Is Required"
                    : !emailRegex.test(e.target.value)
                        ? "Email is not valid ex:xxx@xxxx.com"
                        : ""
            })
        } else {
            setUser({
                ...User,
                Password: e.target.value
            })

            setErrors({
                ...errors,
                PasswordErr: e.target.value.length === 0
                    ? "This Field Is Required"
                    : e.target.value.length < 8
                        ? "Password length should be at least 8 characters"
                        : ""
            })
        }
    }

    const handleClick = () => {
        setUser({
            ...User,
            IsVisible: !User.IsVisible
        })
    };

    const SubmitDate = (e: any) => {
        e.preventDefault()
        if (!errors.EmailErr && !errors.PasswordErr) {
            localStorage.setItem('userData', JSON.stringify(User));
            router.push('/Home')
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">Login</h1>
            <form style={{ width: "60%" }} className="container my-5" onSubmit={(e) => SubmitDate(e)}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control"
                        value={User.Email} onChange={(e) => changeUserDate(e)} name="Email" />
                    <p className="text-light"> {errors.EmailErr} </p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type={User.IsVisible ? "text" : "password"} className="form-control"
                        value={User.Password} onChange={(e) => changeUserDate(e)} name="Password" />
                    <p className="text-light"> {errors.PasswordErr} </p>
                </div>
                <div className="mb-2">
                    {User.IsVisible ? <button onClick={handleClick} className="btn btn-dark text-light">Hide</button> : <button onClick={handleClick} className="btn btn-light text-dark">Show</button>}
                </div>

                <button disabled={
                    !User.Email ||
                    !User.Password ||
                    !!errors.EmailErr ||
                    !!errors.PasswordErr
                } style={{ width: "100%" }} type="submit" onSubmit={(e) => SubmitDate(e)} className="btn btn-primary">
                    Login
                </button>
            </form>
        </>
    )
}