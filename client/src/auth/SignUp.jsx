import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../utils/ValidationSchema";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isClicked,setIsClicked] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignup = async (data) => {
    setIsClicked(true)
    try {
      const req = await fetch("http://localhost:3000/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const res = await req.json();
      console.log(res);
      if(!res.success){
        toast.error(res.errMsg)
      }
      if(res.success){
        toast.success(res.message)
        navigate("/auth/login")
      }
      
    } catch (error) {
      console.log(error.message);
      
    }finally{
      setIsClicked(false)
    }
  };
  const btnTxt = isClicked ? "loading..." : "Sign Up"
  return (
    <>
      <main className="sign-up-container ">
        <h2>Sign up</h2>
        <Form
          className="container w-50 bg-white"
          onSubmit={handleSubmit(handleSignup)}
        >
          {/* first name */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              className="border border-5 border-primary"
              placeholder="Enter First name"
              {...register("firstName")}
            />
            <p className="text-danger fs-5">{errors.firstName?.message}</p>
          </Form.Group>
          {/* last name */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              className="border border-5 border-primary"
              placeholder="Enter last name"
              {...register("lastName")}
            />
            <p className="text-danger fs-5">{errors.lastName?.message}</p>
          </Form.Group>
          {/* email address */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className="border border-5 border-primary"
              placeholder="Enter email"
              {...register("email")}
            />
            <p className="text-danger fs-5">{errors.email?.message}</p>
          </Form.Group>
          {/* password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="border border-5 border-primary"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <p className="text-danger fs-5">{errors.password?.message}</p>
          </Form.Group>
          {/* confirm password */}
          <Form.Group className="mb-3" controlId="formBasicPasswordcon">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              className="border border-5 border-primary"
              type="password"
              placeholder="confirm pwd"
              {...register("confirmPassword")}
            />
            <p className="text-danger fs-5">{errors.confirmPassword?.message}</p>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {btnTxt}
          </Button>
        </Form>
      </main>
    </>
  );
};

export default SignUp;
