import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from '../utils/ValidationSchema';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })

  const onSubmit = (data) => console.log(data,errors);

  return (
    <>
    <main className='sign-in-container d-flex justify-content-center align-items-center'>
      <div className='container '>

    <h2 className='text-center text-white'>Login</h2>

    <Form onSubmit={handleSubmit(onSubmit)} className='w-50 m-auto bg-white p-5'>
    <Form.Group as={Row} className="mb-3" controlId="">
        <Form.Label column sm="2">
          First name
        </Form.Label>
        <Col sm="10">
          <Form.Control placeholder="first name" type="text"   {...register("firstName")}/>
          <p>{errors.firstName?.message}</p>

        </Col>
      </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control placeholder="email"  {...register("email")}/>
          <p>{errors.email?.message}</p>

        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password" {...register("password")}/>
          <p>{errors.password?.message}</p>

        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPasswords">
        <Form.Label column sm="2">
          confirm password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="confirm password" {...register("confirmPwd")} />
          <span className='text-danger'>{errors.confirmPwd?.message}</span>

        </Col>
      </Form.Group>
      <button>Register</button>
    </Form>
      </div>

    </main>
    </>
  )
}

export default Login