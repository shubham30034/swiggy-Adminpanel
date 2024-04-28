import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { register } from '@/http/api'
import { useRef } from 'react'




const Register = () => {
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef =  useRef()
  const numberRef =  useRef()

  
  


  const navigate = useNavigate()
  
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("register successful Successful");
      navigate("/auth/login")
    },
  })

  console.log("mutation",mutation);

  const handelRegisterSubmit = ()=>{
    const email = emailRef?.current?.value
    const password = passwordRef?.current?.value
    const name = nameRef?.current?.value
    const number = numberRef?.current?.value

    
     mutation.mutateAsync({email,password,name,number,role:"Creater"})
   
     
  
  }



  return (
    <div className=' h-screen flex justify-center items-center'>
       <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
         Enter your information to create an account
         {mutation.isError&& <div className=' text-red-400'>{mutation.error.message}</div>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
             ref={nameRef}
              id="name"
              type="name"
              placeholder="m@example.com"
              required
            />
          </div>

          
          <div className="grid gap-2 ">
            <Label htmlFor="email">Email</Label>
            <Input
            ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2 ">
            <Label htmlFor="email">Number</Label>
            <Input
            ref={numberRef}
              id="number"
              type="number"
              placeholder="8279898128"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" ref={passwordRef} />
          </div>
          <Button type="submit" className="w-full my-2" onClick={handelRegisterSubmit} disable={mutation.isPending}>
          {mutation.  isPending &&  <LoaderCircle className=' animate-spin'/> }     <span>Create an account</span> 
          </Button>
          
        </div>
        <div className="mt-3 text-center text-sm">
          Already have an account?{" "}
          <Link to={'/auth/login'} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default Register