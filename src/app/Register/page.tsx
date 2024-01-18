"use client"

import { useState } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/navigation'

export default function Register() {
    const router = useRouter()

    const [User, setUser] = useState({
        Name: '',
        Email: '',
        UserName: '',
        Password: '',
        ConfirmPassword: ''
    })

    const [errors, setErrors] = useState({
        NameErr: "",
        EmailErr: "",
        UserNameErr: "",
        PasswordErr: "",
        ConfirmPasswordErr: ""
    })

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const userNameRegex = /^\S*$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const changeUserDate = (e: any) => {
        if (e.target.name === "Name") {
            setUser({
                ...User,
                Name: e.target.value
            })

            setErrors({
                ...errors,
                NameErr: e.target.value.length === 0
                    ? "This Field Is Required"
                    : ""
            })
        }
        else if (e.target.name === "Email") {
            setUser({
                ...User,
                Email: e.target.value
            })

            setErrors({
                ...errors,
                EmailErr: e.target.value.length === 0
                    ? "This Field Is Required"
                    : !emailRegex.test(e.target.value)
                        ? "Email is not valid ex: xxx@xxxx.com"
                        : ""
            })
        }
        else if (e.target.name === "UserName") {
            setUser({
                ...User,
                UserName: e.target.value
            })

            setErrors({
                ...errors,
                UserNameErr: e.target.value.length === 0
                    ? "This Field Is Required"
                    : !userNameRegex.test(e.target.value)
                        ? "User Name must contain no spaces"
                        : ""
            })
        }

        else if (e.target.name === "Password") {
            setUser({
                ...User,
                Password: e.target.value
            })

            setErrors({
                ...errors,
                PasswordErr: e.target.value.length === 0
                    ? "This Field Is Required"
                    : !passwordRegex.test(e.target.value)
                        ? "Password length should be at least 8 characters, contain at least one lowercase letter, one uppercase letter, at least one digit, and one special character. Example: P@ssword1234"
                        : ""
            })

        }

        else {
            setUser({
                ...User,
                ConfirmPassword: e.target.value
            })

            setErrors({
                ...errors,

                ConfirmPasswordErr: e.target.value.length === 0
                    ? "This Field Is Required"
                    : e.target.value !== User.Password
                        ? "Confirm Password does not match Password"
                        : ""
            })
        }
    }

    const SubmitDate = (e: any) => {
        e.preventDefault()
        if (!errors.NameErr && !errors.EmailErr && !errors.UserNameErr && !errors.PasswordErr && !errors.ConfirmPasswordErr) {
            console.log("registered succssefully")
            router.push('/Home')
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">Register</h1>
            <form style={{ width: "60%" }} className="container mt-5" onSubmit={(e) => SubmitDate(e)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control"
                        value={User.Name} onChange={(e) => changeUserDate(e)} name="Name" />
                    <p className="text-light"> {errors.NameErr} </p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control"
                        value={User.Email} onChange={(e) => changeUserDate(e)} name="Email" />
                    <p className="text-light"> {errors.EmailErr} </p>
                </div>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" className="form-control"
                        value={User.UserName} onChange={(e) => changeUserDate(e)} name="UserName" />
                    <p className="text-light"> {errors.UserNameErr} </p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control"
                        value={User.Password} onChange={(e) => changeUserDate(e)} name="Password" />
                    <p className="text-light"> {errors.PasswordErr} </p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"
                        value={User.ConfirmPassword} onChange={(e) => changeUserDate(e)} name="ConfirmPassword" />
                    <p className="text-light"> {errors.ConfirmPasswordErr} </p>
                </div>

                <button disabled={
                    !User.Name ||
                    !User.Email ||
                    !User.UserName ||
                    !User.Password ||
                    !User.ConfirmPassword ||
                    !!errors.NameErr ||
                    !!errors.EmailErr ||
                    !!errors.UserNameErr ||
                    !!errors.PasswordErr ||
                    !!errors.ConfirmPasswordErr
                } style={{ width: "100%" }} type="submit" className="btn btn-primary mt-3 mb-5" onSubmit={(e) => SubmitDate(e)}>Register</button>
            </form>
        </>
    )
}    
