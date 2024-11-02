import React,{useContext, useState} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from '../utils/ValidationSchema';
import Button from "react-bootstrap/Button";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';


const Login = () => {
  const [isClicked,setIsClicked] = useState(false);
  const {setUser} = useContext(CartContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting},
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })

  const onSubmit = async(data) => {
    setIsClicked(true)
    try {
      const req = await fetch("http://localhost:3000/api/auth/signin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const res = await req.json();
      console.log(res);
      if(!res.success){
        toast.error(res.errMsg);
        // alert(res.errMsg)
      }
      if(res.success){
        toast.success(res.message)
        localStorage.setItem("perf-token",res.user.token)
        localStorage.setItem("fullName",`${res.user.firstName} ${res.user.lastName}`)
        navigate("/")
        setUser()
      }
      
    } catch (error) {
      
    }finally{
      setIsClicked(false)
    }
  };
  const btnTxt = isClicked ? "loading..." : "Sign In"

  return (
    <>
    <main className='sign-in-container d-flex justify-content-center align-items-center'>
      <div className='container '>

    <h2 className='text-center text-white'>Login</h2>

    <Form onSubmit={handleSubmit(onSubmit)} className='w-50 m-auto bg-white p-5'>
    
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control placeholder="email"  {...register("email")}/>
          <p className='text-danger'>{errors.email?.message}</p>

        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password" {...register("password")}/>
          <p className='text-danger'>{errors.password?.message}</p>

        </Col>
      </Form.Group>
     
      <Button variant="primary" type="submit" disabled={isSubmitting}>
{btnTxt}          </Button>    </Form>
      </div>

    </main>
    </>
  )
}

export default Login