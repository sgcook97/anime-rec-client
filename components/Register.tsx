import axios from "axios";
import { Span } from "next/dist/trace";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    username: string,
    password: string,
};

const Register = (props : any) => {

    const {register, watch, handleSubmit, formState:{errors}} = useForm<Inputs>();
    const api_url = process.env.NEXT_PUBLIC_SAMNROLL_API_URL;

    const submitForm: SubmitHandler<Inputs>  = (formData : any) => {
        // console.log(data);
        axios({
            method: "POST",
            url: api_url + "register",
            data:{
                username: formData.username,
                password: formData.password,
                hasRatings: false
            },
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => {
            props.setToken(response.data.access_token);
            props.handleLogin(response.data.userData);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })

        formData.username = "";
        formData.password = "";
    }

    return (
        <div className="auth-container" suppressHydrationWarning={true} >
            <h3>Register</h3>
            <form 
                className="reg-form" 
                onSubmit={handleSubmit(submitForm)}
            >
                <input className="m-1" {...register("username", {required:true, maxLength:30})} placeholder="enter a username" />  
                {errors.username && <span style={{ color:"red" }}>Username is required</span>}
                {errors.username?.type=="maxLength" && <span style={{ color:"red" }}>Max characters allowed is 30</span>}     
                <input className="m-1" {...register("password", {required:true, maxLength:15, minLength:6})} placeholder="enter a password" type="password" autoComplete="off" />
                {errors.password && <span style={{ color:"red" }}>Password is required</span>}
                {errors.password?.type=="minLength" && <span style={{ color:"red" }}>Min characters allowed is 6</span>}
                {errors.password?.type=="maxLength" && <span style={{ color:"red" }}>Max characters allowed is 15</span>}
                <button className="login-button" type="submit" >Register</button>
            </form>
            <a onClick={() => props.onFormSwitch('login')} className="change-form" >Already have an account? Log in here</a>
        </div>
    );
}

export default Register;